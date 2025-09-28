
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo_dark from '../assets/logo_dark.png';
import logo_light from '../assets/logo_light.png';



const HomePage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark'); // Default theme is dark
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Reset global styles for <html> and <body>
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.boxSizing = 'border-box';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    
    // Set body background to match theme
    document.body.style.backgroundColor = theme === 'dark' ? '#1e293b' : '#f8fafc';
    document.body.style.color = theme === 'dark' ? '#94a3b8' : '#1e40af';
  }, [theme]);

  const faqs = [
    {
      question: 'What is Significant?',
      answer: 'Significant is a platform designed to help users learn and practice sign language effectively.',
    },
    {
      question: 'How do I start learning?',
      answer: 'Click the "Start Learning" button to begin your journey with our interactive lessons.',
    },
    {
      question: 'What is American Sign Language (ASL)?',
      answer: 'American Sign Language (ASL) is a visual language used by Deaf and hard-of-hearing people in the U.S. and Canada to communicate through hand signs, gestures, and facial expressions',
    },
    {
      question: 'Why is learning ASL important?',
      answer: 'Learning ASL helps you communicate with the Deaf community, promotes inclusion, and connects you with more people.',
    }
    
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleStart = () => {
    navigate('/quiz');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', // start from top
      alignItems: 'center', // horizontally center
      textAlign: 'center',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f8fafc',
      color: theme === 'dark' ? '#94a3b8' : '#1e293b',
      width: '100vw',
      height: '100vh',
      padding: '1rem', // reduced padding
      boxSizing: 'border-box', // prevent width issues
      overflow: 'auto', // allow scrolling within container if needed
      position: 'relative',
    },
  heading: {
    fontSize: '2.5rem',
    color: theme === 'dark' ? '#e2e8f0' : '#1e293b', // Heading color based on theme
    marginBottom: '1rem', // Add spacing below the heading
  },
  paragraph: {
    fontSize: '1.2rem',
    color: theme === 'dark' ? '#cbd5e1' : '#475569', // Paragraph color based on theme
    marginBottom: '1rem', // Add spacing below the paragraph
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
    marginBottom: '2rem', // Space from the FAQ section
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
  faqSection: {
    width: '100%',
    maxWidth: '800px', // readable width
    margin: '2rem auto', // horizontally center
    backgroundColor: theme === 'dark' ? '#0f172a' : '#e2e8f0',
    borderRadius: '12px',
    padding: '1rem 2rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'background 0.3s',
  },
  faqItem: {
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  question: {
    fontWeight: '600',
    fontSize: '1.1rem',
    color: theme === 'dark' ? '#cbd5e1' : '#334155',
  },
  answer: {
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: theme === 'dark' ? '#94a3b8' : '#475569',
    maxHeight: 0,
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, padding 0.3s ease',
  },
  answerExpanded: {
    maxHeight: '500px',
    paddingTop: '0.5rem',
  },
};

  return (
    <div style={styles.container}>
      <h1 style={{...styles.heading, fontSize: '4rem', marginBottom: '0.5rem'}}>Welcome to Significant</h1>
      <p style={{...styles.paragraph, fontSize: '2rem', marginTop: '0.2'}}>Your ASL learning platform</p>
      <img
      src={theme === 'dark' ? logo_dark : logo_light} // Dynamically set the logo based on the theme
      alt="Logo"
      style={theme === 'dark' ? styles.logo_dark : styles.logo_light} // Apply the appropriate styles
      />
      <button
        onClick={handleStart}
        style={{
          ...styles.button,
          background: 'white', // White background
          borderRadius: '50px', // Pill-shaped button
          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)', // Enhanced shadow
          color: '#2563eb', // Blue text
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#e2e8f0'; // Slightly darker white on hover
          e.target.style.color = '#1d4ed8'; // Darker blue text on hover
          e.target.style.transform = 'scale(1.1) translateY(-2px)'; // Slight bounce effect
        }}
        onMouseOut={(e) => {
          e.target.style.background = '#e2e8f0'; // Reset background
          e.target.style.color = '#2563eb'; // Reset text color
          e.target.style.transform = 'scale(1) translateY(0)'; // Reset bounce
        }}
        aria-label="Start Quiz"
      >
        Start Learning
      </button>
      <button
        onClick={toggleTheme}
        style={styles.toggleButton}
        aria-label={`${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      >
        {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <div style={styles.faqSection}>
        <h2 style={{ marginBottom: '1rem' }}>FAQ</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={styles.faqItem}
            onClick={() => toggleFAQ(index)}
            aria-expanded={expandedIndex === index}
          >
            <div style={styles.question}>{faq.question}</div>
            <div
              style={{
                ...styles.answer,
                ...(expandedIndex === index ? styles.answerExpanded : {}),
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
    </div>
  </div>
  );
};
export default HomePage;
