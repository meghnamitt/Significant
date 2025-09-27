import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to SIGNificant</h1>
      <p>Your ASL learning platform</p>
      <div style={{ marginTop: 24 }}>
        <Link to="/login">Login to store your data</Link>
      </div>
    </div>
  );
};

export default HomePage;