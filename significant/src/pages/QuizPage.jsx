import React from 'react';
import Quiz from '../components/Quiz';

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
  return (
    <div>
      <Quiz questions={aslQuestions} title="ASL Basics Quiz" />
    </div>
  );
};

export default QuizPage;
