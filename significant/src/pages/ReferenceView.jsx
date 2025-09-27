import React from 'react';
import { useParams } from 'react-router-dom';

const ReferenceView = () => {
  const { word } = useParams();
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>{word}</h2>
    </div>
  );
};

export default ReferenceView;
