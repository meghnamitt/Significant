import {FilesetResolver, HandLandmarker, DrawingUtils, type NormalizedLandmark} from "@mediapipe/tasks-vision";
import {useEffect, useRef, useState, forwardRef, useImperativeHandle} from "react";

import * as tf from '@tensorflow/tfjs-core';
import {TFLiteModel, loadTFLiteModel} from "@tensorflow/tfjs-tflite";

import Buffer from "./buffer.ts";

export interface GtkRef {
    flushBuffer: () => void;
    getBufferSize: () => number;
    addToBuffer: (input: number[]) => void;
    clearBuffer: () => void;
    setDetectionEnabled: (enabled: boolean) => void;
}

interface GtkProps {
    style?: React.CSSProperties;
    callback: ((arg0: string) => void) | null;
    focusSublist: string[]
}

function argmax(array: number[], n: number = 1): number[] {
    if (array.length === 0) return [];
    if (n <= 0) return [];
    if (n >= array.length) n = array.length;

    const indices = Array.from({ length: array.length }, (_, i) => i);

    return indices
        .sort((a, b) => array[b] - array[a])
        .slice(0, n);
}

const Gtk = forwardRef<GtkRef, GtkProps>(function Gtk({style={}, callback=null, focusSublist=[]}, ref) {
    const [tfliteModel, setTfliteModel] = useState<TFLiteModel | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signList, setSignList] = useState<string[]>([]);
    // currentLandmarks kept for potential future use (visuals/exports)
    const [, setCurrentLandmarks] = useState<NormalizedLandmark[]>([]);

    const bufferRef = useRef<Buffer<number[]>>(new Buffer(60, new Array(42).fill(0)));
    const drawingUtilsRef = useRef<DrawingUtils | null>(null);
    const detectionEnabledRef = useRef<boolean>(true);

    useImperativeHandle(ref, () => ({
        flushBuffer: () => {
            if (bufferRef.current.flush) {
                bufferRef.current.flush();
            }
        },
        getBufferSize: () => {
            return bufferRef.current.getCurrentSize();
        },
        addToBuffer: (input: number[]) => {
            bufferRef.current.add(input);
        },
        clearBuffer: () => {
            if (bufferRef.current.clear) {
                bufferRef.current.clear();
            }
        }
        ,
        setDetectionEnabled: (enabled: boolean) => {
            detectionEnabledRef.current = enabled;
            // If disabling detection, clear any accumulated buffer to avoid stale predictions
            if (!enabled) {
                try {
                    bufferRef.current.clear();
                } catch {
                    // ignore
                }
                // Clear the canvas so visuals stop
                if (canvasRef.current) {
                    const cvs = canvasRef.current;
                    const ctx = cvs.getContext('2d');
                    if (ctx) ctx.clearRect(0, 0, cvs.width, cvs.height);
                }
            }
        }
    }), []);

    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        let handLandmarker: HandLandmarker | null = null;
        let animationFrameId: number;
        let isMounted = true;

        async function loadLandmarker() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );
            handLandmarker = await HandLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath: "hand_landmarker.task"
                    },
                    numHands: 1,
                    runningMode: "VIDEO",
                }
            );
            setTfliteModel(await loadTFLiteModel('model.tflite'));

            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    drawingUtilsRef.current = new DrawingUtils(ctx);
                }
            }

            detectHands();
        }

        function loadSignList() {
            return fetch('/signsList.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    return text.split('\n').filter(line => line.trim() !== '');
                })
                .catch(error => {
                    console.error('Error loading sign list:', error);
                    return [] as string[];
                });
        }

        loadSignList().then(signs => {
            setSignList(signs)
        });

        const detectHands = () => {
            if (!isMounted) return;
            if (handLandmarker && videoRef.current && canvasRef.current &&
                videoRef.current.readyState >= 2) {

                // If detection is disabled, skip processing frames but keep the loop running
                if (!detectionEnabledRef.current) {
                    // optional: clear overlay
                    const canvas = canvasRef.current;
                    const ctx = canvas?.getContext('2d');
                    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
                    animationFrameId = requestAnimationFrame(detectHands);
                    return;
                }

                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const video = videoRef.current;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.style.width = video.clientWidth + 'px';
                canvas.style.height = video.clientHeight + 'px';

                const detections = handLandmarker.detectForVideo(
                    videoRef.current,
                    performance.now()
                );

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (detections.landmarks.length > 0) {
                    const landmarks = detections.landmarks[0];

                    if (drawingUtilsRef.current) {
                        drawingUtilsRef.current.drawConnectors(
                            landmarks,
                            HandLandmarker.HAND_CONNECTIONS,
                            {
                                color: '#00FF00',
                                lineWidth: 2
                            }
                        );

                        drawingUtilsRef.current.drawLandmarks(landmarks, {
                            color: '#FF0000',
                            fillColor: '#FF0000',
                            radius: 4
                        });
                    }

                    setCurrentLandmarks(landmarks);

                    const flip = detections.handedness[0][0].index === 1;
                    const input: number[] = [];
                    landmarks.forEach(landmark => {
                        if (flip) input.push(1 - landmark.x);
                        else input.push(landmark.x);
                        input.push(landmark.y);
                    });
                    bufferRef.current.add(input);
                } else {
                    setCurrentLandmarks([]);
                }
            }
            animationFrameId = requestAnimationFrame(detectHands);
        };

        const startWebcam = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            videoRef.current.addEventListener('loadeddata', () => {
                loadLandmarker();
            });
        }
    } catch (error) {
        console.error("Error accessing webcam:", error);
    }
};

        startWebcam();

        // Capture ref values for cleanup
        const buffer = bufferRef.current;
        const drawingUtils = drawingUtilsRef.current;

        return () => {
            isMounted = false;

            if (streamRef.current) {   // 👈 stop all tracks
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            if (buffer) {
                buffer.clear();
                buffer.clearCallbacks();
            }
            if (handLandmarker) {
                handLandmarker.close();
            }
            if (drawingUtils) {
                drawingUtils.close();
            }
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
};
    }, []);

    useEffect(() => {
        if (!tfliteModel) return;
        const buffer = bufferRef.current;
        const handleBufferCallback = async (inputs: number[][]) => {
            try {
                const inputTensor = tf.tensor([inputs], [1, 60, 42]);
                const prediction = tfliteModel.predict(inputTensor) as tf.Tensor;
                const predictionData = Array.from(await prediction.data());
                if (signList.length > 0) {
                    let probs = []
                    let labels = []
                    if (focusSublist.length > 0) {
                        for (let i = 0; i < predictionData.length; i++) {
                            if (focusSublist.includes(signList[i])) {
                                labels.push(signList[i])
                                probs.push(predictionData[i])
                            }
                        }
                    } else {
                        probs = predictionData;
                        labels = signList;
                    }
                    argmax(probs, 1).forEach((signIdx) => {
                        if(callback != null) callback(labels[signIdx]);
                    })
                }
                inputTensor.dispose();
                prediction.dispose();
            } catch (error) {
                console.error('Error during model inference:', error);
            }
        };

        buffer.addCallback(handleBufferCallback);

        return () => {
            buffer.clearCallbacks();
        };
    }, [tfliteModel, signList, focusSublist, callback]);

    return (
        <div style={{
            position: "relative",
            lineHeight: 0,
            ...style,
        }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    display: 'block',
                    width: "100%",
                    height: "auto"
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
});

Gtk.displayName = 'Gtk';

export default Gtk;
