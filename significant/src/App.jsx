import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ProgressBar from './components/ProgressBar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;