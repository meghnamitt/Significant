import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig'; // Ensure this points to your Firebase initialization file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(app); // Get the Firebase Auth instance

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in successfully:', user.uid);
      setMessage('Login successful! Redirecting...');
      // Add redirection logic here if needed, e.g., using React Router
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '1rem' }}>
      <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
            Login
          </Button>
        </form>
        {message && <Typography color="secondary" align="center" style={{ marginTop: 16 }}>{message}</Typography>}
      </div>
    </div>
  );
};

export default LoginPage;