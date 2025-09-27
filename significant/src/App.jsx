import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import VideoPage from './pages/VideoQuiz';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {

  return (
    <Router>
      <div className="App" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', boxSizing: 'border-box' }}>
        <nav style={{ 
          marginBottom: '1rem', 
          position: 'absolute', 
          top: '10px', 
          left: '10px', 
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          padding: '0.5rem',
          borderRadius: '8px'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Home</Link>
          <Link to="/quiz" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Quiz</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Login</Link>
          <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Signup</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video" element={<VideoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;