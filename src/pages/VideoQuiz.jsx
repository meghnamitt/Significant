import { useState, useRef } from "react";
import VideoRecorder from "../components/VideoRecorder";

export default function VideoQuiz() {
  const [promptWord, setPromptWord] = useState("");
  const [result, setResult] = useState(null);
  const videoRecorderRef = useRef(null);

  const words = ["Hello", "Thank You", "Yes", "No"];

  const nextWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setPromptWord(word);
    // Start a new recording when a new word is shown
    if (videoRecorderRef.current) {
      videoRecorderRef.current.startRecording();
    }
  };

  const handleCapture = async (blob) => {
    // send blob to ML library here
    console.log("Captured clip:", blob);

    // demo: pretend we got a score
    setResult("Analyzing... (call ML library here)");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sign this word:</h2>
      <h1>{promptWord}</h1>
      <VideoRecorder ref={videoRecorderRef} />
      <div style={{ marginTop: "20px" }}>
        <button onClick={nextWord}>Next Word</button>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}

