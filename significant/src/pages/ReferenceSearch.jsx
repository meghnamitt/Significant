import React, { useState } from 'react';
import words from '../words';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const ReferenceSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
  const filteredWords = allWords.filter(word => word.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <Typography variant="h3" align="center" gutterBottom>
        References
      </Typography>
      <TextField
        label="Search words"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ margin: '24px 0' }}
      />
      <div style={{ maxHeight: 500, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
        <ul style={{ columns: 2, margin: 0, paddingLeft: 20 }}>
          {filteredWords.map((word, idx) => (
            <li
              key={idx}
              style={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline' }}
              onClick={() => navigate(`/reference-view/${encodeURIComponent(word)}`)}
            >
              {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferenceSearch;
