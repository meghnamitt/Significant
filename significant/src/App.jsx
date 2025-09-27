import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';

function App() {

  
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link> |{' '}
          <Link to="/reference-search">Reference Search</Link> |{' '}
          <Link to="/video-quiz">Video Quiz</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/signup">Create Account</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/reference-search" element={<ReferenceSearch />} />
          <Route path="/reference-view/:word" element={<ReferenceView />} />
          <Route path="/video-quiz" element={<VideoQuiz />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;