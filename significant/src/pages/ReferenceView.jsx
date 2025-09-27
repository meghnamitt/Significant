import React from 'react';
import { useParams } from 'react-router-dom';

const ReferenceView = () => {
  const { word } = useParams();
  // Use the word exactly as the filename (e.g., cat → cat.mp4)
  const videoFile = `/src/ref_videos/${word}.mp4`;
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>{word}</h2>
      <div style={{ marginTop: 32 }}>
        <video width="400" controls>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ReferenceView;
