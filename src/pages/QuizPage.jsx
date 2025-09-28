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
  // Flatten all words from all categories (including nested objects)
  const flattenWords = (obj) => {
    let arr = [];
    Object.values(obj).forEach(val => {
      if (Array.isArray(val)) {
        arr = arr.concat(val);
      } else if (typeof val === 'object' && val !== null) {
        arr = arr.concat(flattenWords(val));
      }
    });
    return arr;
  };

  const allWords = flattenWords(words);
  const getRandomWord = () => allWords[Math.floor(Math.random() * allWords.length)];
  const [randomWord, setRandomWord] = useState(getRandomWord());

  const handleNewWord = () => {
    setRandomWord(getRandomWord());
  };

  return (
    <div>
      <Quiz questions={aslQuestions} title="ASL Basics Quiz" />
    </div>
  );
};



export default QuizPage;
