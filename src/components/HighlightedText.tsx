import React from 'react';
import { Box } from '@mui/material';

interface HighlightedTextProps {
  text: string;
  keywords: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, keywords }) => {
  const trimmedKeywords = keywords.trim();

  if (!trimmedKeywords) {
    return <>{text}</>;
  }

  const keywordList = trimmedKeywords
    .toLowerCase()
    .split(/\s+/)
    .filter(keyword => keyword.length > 0)
    .map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special regex characters

  if (keywordList.length === 0) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${keywordList.join('|')})`, 'gi');

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = keywordList.some(
          keyword => part.toLowerCase() === keyword.toLowerCase()
        );

        if (isMatch) {
          return (
            <Box
              key={index}
              component="span"
              sx={{
                backgroundColor: 'rgba(255, 246, 25, 0.63)',
                fontWeight: 'inherit',
              }}
            >
              {part}
            </Box>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

