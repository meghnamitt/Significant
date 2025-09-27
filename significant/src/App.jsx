import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ReferenceSearch from './pages/ReferenceSearch';
import ReferenceView from './pages/ReferenceView';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link> |{' '}
          <Link to="/reference-search">Reference Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/reference-search" element={<ReferenceSearch />} />
          <Route path="/reference-view/:word" element={<ReferenceView />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
