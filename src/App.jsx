import React, { useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ReferenceSearch from './pages/ReferenceSearch';
import ReferenceView from './pages/ReferenceView';
import GTkApp from './pages/GTKApp';
import LoginPage from './pages/LoginPage';
import VideoPage from './pages/VideoQuiz';
import SignupPage from './pages/SignUpPage';

function App() {
  const [userName, setUserName] = useState(''); // State to store the logged-in user's name

  return (
    <Router>
      <div className="App" style={{ width: '100%', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', boxSizing: 'border-box' }}>
        {/* Display the user's name if logged in */}
        {userName && (
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            zIndex: 1000, 
            background: 'rgba(0,0,0,0.5)', 
            padding: '0.5rem', 
            borderRadius: '8px', 
            color: 'white' 
          }}>
            Welcome, {userName}!
          </div>
        )}
        
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
          <Link to="/signup" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Signup</Link>
          <Link to="/reference-search" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Reference Search</Link>
          <Link to="/gtk-app" style={{ color: 'white', textDecoration: 'none' }}>GTk App</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/login" element={<LoginPage setUserName={setUserName} />} /> {/* Pass setUserName to LoginPage */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/reference-search" element={<ReferenceSearch />} />
          <Route path="/gtk-app" element={<GTkApp />} />
          <Route path="/reference-view/:word" element={<ReferenceView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;