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