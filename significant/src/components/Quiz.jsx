import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProgressBar from './ProgressBar';
import Question from './Question';

// Quiz component now accepts questions and title as props
const Quiz = ({ questions, title }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const progress = Math.round(((current + (completed ? 1 : 0)) / questions.length) * 100);

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      {title && (
        <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>{title}</Typography>
      )}
      <ProgressBar progress={progress} />
      {!completed ? (
        <>
          <Question
            key={current}
            question={questions[current].question}
            options={questions[current].options}
            correctOption={questions[current].correctOption}
            onAnswer={handleAnswer}
          />
          <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
            {current < questions.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </>
      ) : (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Quiz Complete! Your score: {score} / {questions.length}
        </Typography>
      )}
    </Box>
  );
};

export default Quiz;
