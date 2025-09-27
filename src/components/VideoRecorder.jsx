import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

const VideoRecorder = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const timeoutRef = useRef(null);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    startCamera();
    return () => {
      // Stop recording if active
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Method to start a new recording
  const startRecording = (duration = 2000) => {
    if (!streamRef.current) return;
    setRecordedVideo(null);
    setIsRecording(true);
    const recorder = new MediaRecorder(streamRef.current, { mimeType: "video/webm" });
    recorderRef.current = recorder;
    const localChunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localChunks.push(event.data);
      }
    };
    recorder.onstop = () => {
      const blob = new Blob(localChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      setIsRecording(false);
    };
    recorder.start();
    timeoutRef.current = setTimeout(() => {
      recorder.stop();
    }, duration);
  };

  useImperativeHandle(ref, () => ({
    startRecording,
  }));

  return (
    <div className="p-6">
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg shadow-lg" />
      {/* Call startRecording from parent to trigger a new recording */}
      {recordedVideo && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recorded Video:</h3>
          <video src={recordedVideo} controls className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
      )}
    </div>
  );
});

export default VideoRecorder;