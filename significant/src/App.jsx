import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Template from './components/Template'
import ProgressBar from './components/ProgressBar'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizPage from './components/QuizPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.jsx</code> and save to test HMR
                </p>
              </div>
              <Template 
                title="My First Template"
                onAction={() => alert("Button clicked!")}
                actionLabel="Say Hi"
              >
                <p>This is some content passed as children into the Template.</p>
              </Template>
            </>
          } />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
