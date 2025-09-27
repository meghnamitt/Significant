import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Props: question (string), options (array), correctOption (index or value), onAnswer (callback)
const Question = ({ question, options, correctOption, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index) => {
    setSelected(index);
    const isCorrect = index === correctOption;
    
    if (isCorrect) {
      setAnswered(true);
      if (onAnswer) {
        onAnswer(true);
      }
    }
    // If incorrect, don't set answered to true, allowing more attempts
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{question}</Typography>
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant={selected === idx ? 'contained' : 'outlined'}
          color={
            answered && idx === correctOption 
              ? 'success' 
              : selected === idx && !answered 
                ? 'error' 
                : 'primary'
          }
          onClick={() => !answered && handleSelect(idx)}
          sx={{ display: 'block', mb: 1, textAlign: 'left', width: '100%' }}
        >
          {option}
        </Button>
      ))}
      {selected !== null && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          {answered ? 'Correct!' : 'Try again!'}
        </Typography>
      )}
    </Box>
  );
};

export default Question;
