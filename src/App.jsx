import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ReferenceSearch from './pages/ReferenceSearch';
import ReferenceView from './pages/ReferenceView';
import GTkApp from  './pages/GTKApp';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/quiz">Quiz</Link> |{' '}
          <Link to="/reference-search">Reference Search</Link> |{' '}
          <Link to="/gtk-app">GTk App</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/reference-search" element={<ReferenceSearch />} />
          <Route path="/reference-view/:word" element={<ReferenceView />} />
          <Route path="/gtk-app" element={<GTkApp />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;