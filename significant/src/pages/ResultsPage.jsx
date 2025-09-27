import React from 'react';
import Results from '../components/Results';

const ResultsPage = ({ score, totalQuestions, onRestart, title }) => {
  return (
    <div>
      <Results 
        score={score}
        totalQuestions={totalQuestions}
        onRestart={onRestart}
        title={title}
      />
    </div>
  );
};

export default ResultsPage;