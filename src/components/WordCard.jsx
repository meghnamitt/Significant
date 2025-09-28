// WordCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";


const WordCard = ({ word }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "1rem auto",
        borderRadius: 3,
        boxShadow: 4,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Show this sign:
        </Typography>
        <Typography variant="h3" color="primary" fontWeight="bold">
          {word}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WordCard;
