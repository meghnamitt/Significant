import './GTkApp.css'
import words from '../words.ts';
import Gtk, {type GtkRef} from "./Gtk.tsx";
import {useRef, useState, useEffect} from "react";
import WordCard from "../components/WordCard.tsx";

function GTKApp() {
    const gtkRef = useRef<GtkRef>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleDetect = () => {
        gtkRef.current?.flushBuffer();
    };

    const showNotification = (message: string) => {
        setNotification(message);
    };
    
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

    // Create a random word list of 5 words
    const allWords = flattenWords(words);
    const randOffset = Math.floor(Math.random() * allWords.length);
    const wordList: string[] = [];
    for (let i = 0; i < 5; i++) {
        wordList[i] = allWords[(randOffset + i) % allWords.length];
    }

    const targetWord = wordList[Math.floor(Math.random() * wordList.length)];


    useEffect(() => {
        if (notification) {
            const timeId = setTimeout(() => {
                setNotification(null);
            }, 1000);

            return () => {
                clearTimeout(timeId);
            };
        }
    }, [notification]);

    return (
        <div className="app-container">
            <h1> GTK Web Demo </h1>
            <h3>Author, Nana Gupta. (c) 2025 by CCG @ GT</h3>
            <p> Focus sublist filter is active for {wordList.join(", ")}. </p>
            <WordCard word={targetWord} />
            <div className="gtk-wrapper">
                <Gtk
                    focusSublist={wordList}
                    callback={(sign) => showNotification(`Detected: ${sign}`)}
                    ref={gtkRef}
                />

                {notification && (
                    <div className="notification-banner">
                        {notification}
                    </div>
                )}
            </div>

            <button
                className="detect-button"
                onClick={handleDetect}
            >
                <span className="button-text">Detect</span>
            </button>
        </div>
    );
}

export default GTKApp
