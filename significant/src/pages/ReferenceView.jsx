import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReferenceView = () => {
  const { word } = useParams();
  const videoFile = `/src/ref_videos/${word}.mp4`;
  const [videoError, setVideoError] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h2>{word}</h2>
      <div style={{ marginTop: 32 }}>
        {!videoError ? (
          <video width="400" controls onError={() => setVideoError(true)}>
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div style={{ color: '#b71c1c', fontWeight: 'bold', fontSize: '1.2rem' }}>
            No reference video yet for this word...
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceView;
