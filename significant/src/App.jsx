import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import QuizPage from './components/QuizPage';
import HomePage from './pages/HomePage';

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
          <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link>
=======
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ReferenceSearch from './pages/ReferenceSearch';
import ReferenceView from './pages/ReferenceView';
import VideoQuiz from './pages/VideoQuiz';
import LoginPage from './pages/LoginPage';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link> |{' '}
          <Link to="/reference-search">Reference Search</Link> |{' '}
          <Link to="/video-quiz">Video Quiz</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/reference-search" element={<ReferenceSearch />} />
          <Route path="/reference-view/:word" element={<ReferenceView />} />
          <Route path="/video-quiz" element={<VideoQuiz />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;