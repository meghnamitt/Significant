import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const Results = ({ score, totalQuestions, onRestart, title }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Determine performance level and styling
  const getPerformanceData = () => {
    if (percentage >= 80) {
      return {
        level: 'Excellent!',
        color: 'success.main',
        icon: <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />,
        message: 'Outstanding performance! You really know your stuff.'
      };
    } else if (percentage >= 60) {
      return {
        level: 'Good Job!',
        color: 'warning.main',
        icon: <WarningIcon sx={{ fontSize: 60, color: 'warning.main' }} />,
        message: 'Well done! You have a solid understanding.'
      };
    } else {
      return {
        level: 'Keep Practicing!',
        color: 'error.main',
        icon: <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />,
        message: 'Don\'t worry, practice makes perfect!'
      };
    }
  };

  const performanceData = getPerformanceData();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        {/* Title */}
        {title && (
          <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
            {title} Results
          </Typography>
        )}

        {/* Performance Icon */}
        <Box sx={{ mb: 3 }}>
          {performanceData.icon}
        </Box>

        {/* Performance Level */}
        <Typography 
          variant="h5" 
          sx={{ mb: 2, color: performanceData.color, fontWeight: 'bold' }}
        >
          {performanceData.level}
        </Typography>

        {/* Score Display */}
        <Box sx={{ mb: 3, position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={120}
            thickness={6}
            sx={{ color: performanceData.color }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {percentage}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {score}/{totalQuestions}
            </Typography>
          </Box>
        </Box>

        {/* Performance Message */}
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          {performanceData.message}
        </Typography>

        {/* Detailed Breakdown */}
        <Box sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            Breakdown
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Correct Answers:</Typography>
            <Typography sx={{ color: 'success.main', fontWeight: 'bold' }}>
              {score}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Incorrect Answers:</Typography>
            <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {totalQuestions - score}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Total Questions:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              {totalQuestions}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Accuracy:</Typography>
            <Typography sx={{ color: performanceData.color, fontWeight: 'bold' }}>
              {percentage}%
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {onRestart && (
            <Button 
              variant="contained" 
              onClick={onRestart}
              sx={{ minWidth: 120 }}
            >
              Try Again
            </Button>
          )}
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
            sx={{ minWidth: 120 }}
          >
            New Quiz
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Results;