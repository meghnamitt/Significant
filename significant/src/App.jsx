import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import './App.css'

function App() {
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
  )
}

export default App
