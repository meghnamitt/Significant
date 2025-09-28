import React, { useState } from 'react';
import words from '../words';
import {
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Box,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

const ReferenceSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const muiTheme = useTheme();

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
  const filteredWords = allWords
    .filter(word => word.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: theme.colors.textHeading,
              mb: 2
            }}
          >
            Sign Language References
          </Typography>
          <Typography 
            variant="subtitle1"
            sx={{ 
              mb: 3,
              color: theme.colors.textParagraph
            }}
          >
            Search and explore our comprehensive sign language dictionary
          </Typography>
        </Box>

        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            borderRadius: 3,
            backgroundColor: alpha(theme.colors.background, 0.9),
            border: `1px solid ${alpha(theme.colors.textPrimary, 0.2)}`
          }}
        >
          <TextField
            label="Search words"
            variant="outlined"
            fullWidth
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type a word to search..."
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: alpha(theme.colors.textPrimary, 0.05),
                '& fieldset': {
                  borderColor: alpha(theme.colors.textPrimary, 0.3),
                },
                '&:hover fieldset': {
                  borderColor: theme.colors.buttonBackground,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.colors.buttonBackground,
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.colors.textPrimary,
              },
              '& .MuiInputBase-input': {
                color: theme.colors.textHeading,
              },
              '& .MuiInputBase-input::placeholder': {
                color: theme.colors.textPrimary,
                opacity: 0.7,
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ color: theme.colors.textHeading }}
            >
              Results
            </Typography>
            <Chip 
              label={`${filteredWords.length} word${filteredWords.length !== 1 ? 's' : ''} found`}
              sx={{
                backgroundColor: theme.colors.buttonBackground,
                color: theme.colors.buttonText,
                border: `1px solid ${theme.colors.buttonBackground}`
              }}
              size="small"
              variant="outlined"
            />
          </Box>

          <Paper 
            variant="outlined"
            sx={{ 
              maxHeight: 500, 
              overflowY: 'auto',
              borderRadius: 2,
              backgroundColor: alpha(theme.colors.background, 0.7),
              border: `1px solid ${alpha(theme.colors.textPrimary, 0.2)}`
            }}
          >
            <List dense sx={{ py: 0 }}>
              {filteredWords.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No words found" 
                    secondary="Try adjusting your search terms"
                    sx={{ 
                      textAlign: 'center',
                      '& .MuiListItemText-primary': {
                        color: theme.colors.textHeading
                      },
                      '& .MuiListItemText-secondary': {
                        color: theme.colors.textPrimary
                      }
                    }}
                  />
                </ListItem>
              ) : (
                filteredWords.map((word, idx) => (
                  <ListItem key={idx} disablePadding>
                    <ListItemButton
                      onClick={() => navigate(`/reference-view/${encodeURIComponent(word)}`)}
                      sx={{
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                          backgroundColor: alpha(theme.colors.buttonBackground, 0.1),
                          transform: 'translateX(4px)',
                          transition: theme.transition.buttonHover
                        },
                        transition: theme.transition.buttonHover
                      }}
                    >
                      <ListItemText 
                        primary={word}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: 500,
                            color: theme.colors.buttonBackground,
                            textTransform: 'capitalize'
                          }
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Paper>
      </Container>
    </div>
  );
};

export default ReferenceSearch;
