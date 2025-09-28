import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig'; // Ensure this points to your Firebase initialization file

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    const auth = getAuth(app); // Get the Firebase Auth instance

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Account created successfully:', user.uid);
      setMessage('Account created successfully! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('Sign-up error:', error.code, error.message);
      setMessage(`Sign-up failed: ${error.message}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '1rem' }}>
      <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>Create an Account</Typography>
        <form onSubmit={handleSignUp}>
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>
            Sign Up
          </Button>
        </form>
        {message && <Typography color="secondary" align="center" style={{ marginTop: 16 }}>{message}</Typography>}
      </div>
    </div>
  );
};

export default SignUpPage;