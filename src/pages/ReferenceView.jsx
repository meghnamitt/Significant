import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Box, Container } from '@mui/material';
import theme from '../theme';

const ReferenceView = () => {
  const { word } = useParams();
  // Use import.meta.env.BASE_URL to get the correct base path
  const basePath = import.meta.env.BASE_URL || '/';
  const videoFile = `${basePath}ref_videos/${word}.mp4`;
  const [videoError, setVideoError] = useState(false);
  
  console.log('Video path:', videoFile);
  console.log('Base path:', basePath);
  console.log('Word:', word);

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Container maxWidth="md">
        <Paper 
          elevation={3}
          sx={{ 
            p: 4,
            borderRadius: 3,
            backgroundColor: `${theme.colors.background}dd`,
            border: `1px solid ${theme.colors.textPrimary}33`,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: theme.colors.textHeading,
              fontWeight: 'bold',
              textTransform: 'capitalize',
              mb: 3
            }}
          >
            {word}
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            {!videoError ? (
              <video 
                width="100%" 
                style={{ 
                  maxWidth: '500px',
                  borderRadius: '12px',
                  boxShadow: `0 8px 32px ${theme.colors.background}66`
                }}
                controls 
                onError={(e) => {
                  console.error('Video error:', e);
                  console.error('Failed to load:', videoFile);
                  setVideoError(true);
                }}
                onLoadStart={() => console.log('Video load started')}
                onCanPlay={() => console.log('Video can play')}
              >
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: `${theme.colors.buttonBackground}22`,
                  border: `2px dashed ${theme.colors.textPrimary}66`,
                  borderRadius: 2
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: theme.colors.textPrimary,
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                >
                  No reference video available yet for "{word}"
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.colors.textParagraph,
                    mt: 1
                  }}
                >
                  Tried to load: {videoFile}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.colors.textParagraph,
                    mt: 1
                  }}
                >
                  Check back later or try searching for a different word
                </Typography>
              </Paper>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ReferenceView;
