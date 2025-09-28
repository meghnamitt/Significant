// WordCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface WordCardProps {
  word: string;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
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
