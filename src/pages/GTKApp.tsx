import './GTkApp.css'
import words from '../words.ts';
import Gtk, {type GtkRef} from "./Gtk.tsx";
import {useRef, useState, useEffect} from "react";
import WordCard from "../components/WordCard.tsx";

function GTKApp() {
    const gtkRef = useRef<GtkRef>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [isDetecting, setIsDetecting] = useState(false);

    
    // Game state
    const [score, setScore] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameState, setGameState] = useState<'playing' | 'correct' | 'timeout'>('playing');
    const [totalAttempts, setTotalAttempts] = useState(0);
    
    // Create a random word list of 5 words
    function flattenWords(obj: Record<string, unknown>): string[] {
        let arr: string[] = [];
        Object.values(obj).forEach(val => {
            if (Array.isArray(val)) {
                arr = arr.concat(val as string[]);
            } else if (typeof val === 'object' && val !== null) {
                arr = arr.concat(flattenWords(val as Record<string, unknown>));
            }
        });
        return arr;
    }

    const allWords = flattenWords(words);
    const [wordList] = useState(() => {
        const randOffset = Math.floor(Math.random() * allWords.length);
        const list: string[] = [];
        for (let i = 0; i < 5; i++) {
            list[i] = allWords[(randOffset + i) % allWords.length];
        }
        return list;
    });

    const currentTargetWord = wordList[currentWordIndex];

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            // Time's up - mark as timeout
            setGameState('timeout');
            setTotalAttempts(prev => prev + 1);
            
            // Show timeout feedback for 2 seconds, then move to next word
            setTimeout(() => {
                nextWord();
            }, 2000);
        }
    }, [timeLeft, gameState]);

    const nextWord = () => {
        if (currentWordIndex < wordList.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
            setTimeLeft(10);
            setGameState('playing');
        } else {
            // Game finished - reset or show final score
            setCurrentWordIndex(0);
            setTimeLeft(10);
            setGameState('playing');
            setNotification(`Game Complete! Final Score: ${score}/${totalAttempts}`);
        }
    };

    const handleCorrectDetection = () => {
        setScore(prev => prev + 1);
        setTotalAttempts(prev => prev + 1);
        setGameState('correct');
        
        // Show success feedback for 2 seconds, then move to next word
        setTimeout(() => {
            nextWord();
        }, 2000);
    };

    const handleDetect = () => {
        setIsDetecting(true);
        gtkRef.current?.flushBuffer();
        
        // Reset detecting state after a short delay
        setTimeout(() => {
            setIsDetecting(false);
        }, 500);
    };

    const handleGestureDetection = (detectedSign: string) => {
        console.log(`Detected: ${detectedSign}, Target: ${currentTargetWord}`);
        
        if (gameState === 'playing' && detectedSign.toLowerCase() === currentTargetWord.toLowerCase()) {
            // Correct detection!
            setNotification(`Correct! You signed "${detectedSign}"`);
            handleCorrectDetection();
        } else if (gameState === 'playing') {
            // Wrong detection, just show what was detected
            setNotification(`Detected: ${detectedSign}`);
        }
    };



    useEffect(() => {
        if (notification && !['correct', 'timeout'].includes(gameState)) {
            const timeId = setTimeout(() => {
                setNotification(null);
            }, 2000);

            return () => {
                clearTimeout(timeId);
            };
        }
    }, [notification, gameState]);

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
                        <div className={`status-indicator ${
                            gameState === 'correct' ? 'correct' : 
                            gameState === 'timeout' ? 'timeout' : 
                            isDetecting ? 'detecting' : 'active'
                        }`}></div>
                        <span className="status-text">
                            {gameState === 'correct' ? '✅ Correct!' : 
                             gameState === 'timeout' ? '⏰ Time\'s Up!' :
                             isDetecting ? 'Detecting...' : `Time: ${timeLeft}s`}
                        </span>
                        <div className="game-score">
                            <span className="score-label">Score:</span>
                            <span className="score-value">{score}/{totalAttempts}</span>
                        </div>
                    </div>
                    <div className="game-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${(timeLeft / 10) * 100}%` }}
                            ></div>
                        </div>
                        <p className="word-progress">
                            Word {currentWordIndex + 1} of {wordList.length}
                        </p>
                    </div>
                </div>

                <div className="video-section">
                    <div className={`word-card-container ${gameState}`}>
                        <WordCard word={currentTargetWord} />
                    </div>
                    
                    <div className="video-container">
                        <div className="gtk-wrapper">
                            <Gtk
                                focusSublist={wordList}
                                callback={handleGestureDetection}
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

export default GTKApp
