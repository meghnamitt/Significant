import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder: just show a message
    setMessage('Login functionality coming soon!');
  };

  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
  );
};

export default LoginPage;
