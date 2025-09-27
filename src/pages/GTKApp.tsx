import './GTKApp.css'
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

export default GTKApp
