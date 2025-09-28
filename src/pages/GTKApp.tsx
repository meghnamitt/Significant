import './GTKApp.css'
import words from '../words.ts';
import Gtk, {type GtkRef} from "./Gtk.tsx";
import {useRef, useState, useEffect} from "react";

function GTKApp() {
    const gtkRef = useRef<GtkRef>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleDetect = () => {
        gtkRef.current?.flushBuffer();
    };

    const showNotification = (message: string) => {
        setNotification(message);
    };

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
            <p> Focus sublist filter is active for "yellow", and "dance". </p>
            <div className="gtk-wrapper">
                <Gtk
                    focusSublist={['table', 'yellow']}
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
declare var randOffset: number;
randOffset = Math.floor(Math.random() * allWords.length);

// Declare and initialize wordList as a string array of length 5
const wordList: string[] = [];
for (let i = 0; i < 5; i++) {
    wordList[i] = allWords[(randOffset + i) % allWords.length];
}

export default GTKApp
