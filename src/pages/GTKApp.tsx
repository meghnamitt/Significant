import './GTKApp.css'
import words from '../words.ts';
import Gtk, {type GtkRef} from "./Gtk.tsx";
import {useRef, useState, useEffect} from "react";

function GTKApp() {
    const gtkRef = useRef<GtkRef>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const [detectionCount, setDetectionCount] = useState(0);

    const handleDetect = () => {
        setIsDetecting(true);
        setDetectionCount(prev => prev + 1);
        gtkRef.current?.flushBuffer();
        
        // Reset detecting state after a short delay
        setTimeout(() => {
            setIsDetecting(false);
        }, 500);
    };

    const showNotification = (message: string) => {
        setNotification(message);
    };

    useEffect(() => {
        if (notification) {
            const timeId = setTimeout(() => {
                setNotification(null);
            }, 2000);

            return () => {
                clearTimeout(timeId);
            };
        }
    }, [notification]);

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">
                        <span className="title-gradient">GTK</span> Sign Language Detection
                    </h1>
                    <p className="app-subtitle">Real-time American Sign Language Recognition</p>
                </div>
                <div className="author-info">
                    <span className="author-text">Developed by Nana Gupta</span>
                    <span className="copyright-text">&copy; 2025 CCG @ Georgia Tech</span>
                </div>
            </header>

            <main className="app-main">
                <div className="status-card">
                    <div className="status-header">
                        <div className={`status-indicator ${isDetecting ? 'detecting' : 'active'}`}></div>
                        <span className="status-text">
                            {isDetecting ? 'Detecting...' : 'Ready for Detection'}
                        </span>
                        <div className="detection-counter">
                            <span className="counter-label">Analyses:</span>
                            <span className="counter-value">{detectionCount}</span>
                        </div>
                    </div>
                    <p className="filter-info">
                        <span className="filter-label">Active Filters:</span>
                        <span className="filter-tags">
                            <span className="filter-tag">table</span>
                            <span className="filter-tag">yellow</span>
                        </span>
                    </p>
                </div>

                <div className="video-section">
                    <div className="video-container">
                        <div className="gtk-wrapper">
                            <Gtk
                                focusSublist={['table', 'yellow']}
                                callback={(sign) => showNotification(`Detected: ${sign}`)}
                                ref={gtkRef}
                            />

                            {notification && (
                                <div className="notification-banner">
                                    <div className="notification-icon">🎯</div>
                                    <span className="notification-text">{notification}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="controls-section">
                        <button
                            className={`detect-button ${isDetecting ? 'detecting' : ''}`}
                            onClick={handleDetect}
                            disabled={isDetecting}
                        >
                            <span className="button-icon">{isDetecting ? '⏳' : '🔍'}</span>
                            <span className="button-text">
                                {isDetecting ? 'Analyzing...' : 'Analyze Gesture'}
                            </span>
                        </button>
                        
                        <div className="help-text">
                            <p>Position your hand in front of the camera and click "Analyze Gesture" to detect signs</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper to flatten nested words objects (keeps same logic as other pages)
function flattenWords(obj: any): string[] {
        let arr: string[] = [];
        Object.values(obj).forEach(val => {
                if (Array.isArray(val)) {
                        arr = arr.concat(val as string[]);
                } else if (typeof val === 'object' && val !== null) {
                        arr = arr.concat(flattenWords(val));
                }
        });
    return arr;
}

const allWords = flattenWords(words);
const randOffset: number = Math.floor(Math.random() * allWords.length);

// Declare and initialize wordList as a string array of length 5
const wordList: string[] = [];
for (let i = 0; i < 5; i++) {
    wordList[i] = allWords[(randOffset + i) % allWords.length];
}

export default GTKApp
