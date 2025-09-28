import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from './firebaseConfig';
import { isUserAdmin, getUserRole, USER_ROLES } from '../utils/userRoles';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const adminStatus = await isUserAdmin(currentUser.uid);
          const role = await getUserRole(currentUser.uid);
          setIsAdmin(adminStatus);
          setUserRole(role);
          
          if (!adminStatus) {
            // Redirect non-admin users
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          navigate('/');
        }
      } else {
        // No user logged in, redirect to login
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h5" align="center">Loading...</Typography>
      </Container>
    );
  }

  if (!user || !isAdmin) {
    return (
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Typography variant="h5" align="center" color="error">
          Access Denied - Admin Only
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Card style={{ marginBottom: '2rem' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Welcome, Admin!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Role: {userRole}
          </Typography>
          <Typography variant="body1" gutterBottom>
            User ID: {user.uid}
          </Typography>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Admin Controls
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            As an admin, you have access to special functionality and controls.
          </Typography>
          
          <div style={{ marginTop: '1rem' }}>
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginRight: '1rem', marginBottom: '0.5rem' }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => {
                console.log('Admin action performed');
                alert('Admin action performed successfully!');
              }}
            >
              Perform Admin Action
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            System Information
          </Typography>
          <Typography variant="body2">
            This is the admin dashboard for the Significant application. 
            Only users with admin privileges can access this page.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
            Current admin users are managed through the user roles system.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;