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
    setAnswered(true);
    if (onAnswer) {
      onAnswer(index === correctOption);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{question}</Typography>
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant={selected === idx ? 'contained' : 'outlined'}
          color={answered ? (idx === correctOption ? 'success' : (selected === idx ? 'error' : 'primary')) : 'primary'}
          onClick={() => !answered && handleSelect(idx)}
          sx={{ display: 'block', mb: 1, textAlign: 'left', width: '100%' }}
        >
          {option}
        </Button>
      ))}
      {answered && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          {selected === correctOption ? 'Correct!' : 'Try again!'}
        </Typography>
      )}
    </Box>
  );
};

export default Question;
