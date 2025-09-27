import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import words from '../words';

const aslQuestions = [
  {
    question: 'What is the ASL sign for "Hello"?',
    options: ['Wave hand', 'Thumbs up', 'Peace sign', 'Finger snap'],
    correctOption: 0,
  },
  {
    question: 'Which hand shape is used for the ASL sign "Thank you"?',
    options: ['Flat hand', 'Fist', 'V shape', 'Pointing finger'],
    correctOption: 0,
  },
];


const QuizPage = () => {
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];
  const [randomWord, setRandomWord] = useState(getRandomWord());

  const handleNewWord = () => {
    setRandomWord(getRandomWord());
  };

  return (
    <div>
      <Quiz questions={aslQuestions} title="ASL Basics Quiz" />
      <Paper elevation={3} style={{ padding: '2rem', margin: '2rem auto', maxWidth: 400 }}>
        <Typography variant="h4" align="center">
          {randomWord}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNewWord} style={{ display: 'block', margin: '2rem auto 0' }}>
          New Word
        </Button>
      </Paper>
    </div>
  );
};



export default QuizPage;
