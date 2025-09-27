import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo_dark from '../assets/logo_dark.png';
import logo_light from '../assets/logo_light.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark'); // Default theme is dark

  useEffect(() => {
    // Reset global styles for <html> and <body>
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.boxSizing = 'border-box';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';

    // Dynamically update body text color based on theme
    document.body.style.color = theme === 'dark' ? '#94a3b8' : '#1e40af';
  }, [theme]);

  const handleStart = () => {
    navigate('/quiz');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const styles = {
    container: {
      textAlign: 'center',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc', // Dark or light background
      color: theme === 'dark' ? '#94a3b8' : '#1e293b', // Text color based on theme
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      position: 'relative', // Added for toggleButton positioning
      transform: 'translate(-32px, -20px)',
    },
    heading: {
      fontSize: '2.5rem',
      color: theme === 'dark' ? '#e2e8f0' : '#1e293b', // Heading color based on theme
    },
    paragraph: {
      fontSize: '1.2rem',
      color: theme === 'dark' ? '#cbd5e1' : '#475569', // Paragraph color based on theme
    },
    logo_dark: {
      width: '302px',
      height: 'auto',
      marginTop: '1rem',
    },
    logo_light: {
      width: '300px',
      height: 'auto',
      marginTop: '1rem',
    },
    button: {
      padding: '1rem 2rem', // Increased padding for a larger button
      fontSize: '1.5rem', // Increased font size for emphasis
      fontWeight: 'bold', // Bold text for emphasis
      borderRadius: '12px', // Slightly larger border radius for a smoother look
      border: 'none',
      background: theme === 'dark' ? '#3b82f6' : '#2563eb', // Button background based on theme
      color: 'white',
      cursor: 'pointer',
      marginTop: '1.5rem', // Increased margin for spacing
      transition: 'background 0.3s, transform 0.2s', // Added transition for hover effects
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Added subtle shadow for emphasis
    },
    buttonHover: {
      background: theme === 'dark' ? '#2563eb' : '#1d4ed8', // Button hover background based on theme
      transform: 'scale(1.05)', // Slightly enlarge the button on hover
    },
    toggleButton: {
      position: 'absolute', // Positions the button relative to the container
      top: '10px', // 10px from the top
      right: '10px', // 10px from the right
      padding: '0.5rem 1rem',
      fontSize: '1rem',
      borderRadius: '8px',
      border: 'none',
      background: theme === 'dark' ? '#64748b' : '#e2e8f0', // Toggle button background
      color: theme === 'dark' ? '#e2e8f0' : '#1e293b', // Toggle button text color
      cursor: 'pointer',
      transition: 'background 0.3s',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to SIGNificant</h1>
      <p style={styles.paragraph}>Your ASL learning platform</p>
      <img
      src={theme === 'dark' ? logo_dark : logo_light} // Dynamically set the logo based on the theme
      alt="Logo"
      style={theme === 'dark' ? styles.logo_dark : styles.logo_light} // Apply the appropriate styles
      />
      <button
        onClick={handleStart}
        style={styles.button}
        onMouseOver={(e) => {
          e.target.style.background = styles.buttonHover.background;
          e.target.style.transform = styles.buttonHover.transform;
        }}
        onMouseOut={(e) => {
          e.target.style.background = styles.button.background;
          e.target.style.transform = 'scale(1)';
        }}
        aria-label="Start Quiz"
      >
        Start
      </button>
      <button
        onClick={toggleTheme}
        style={styles.toggleButton}
        aria-label={`${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      >
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default HomePage;