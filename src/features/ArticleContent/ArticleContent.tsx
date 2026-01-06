import React from 'react';
import { Typography, Paper } from '@mui/material';
import { Article } from '../../types';
import { HighlightedText } from '../../components/HighlightedText';
import './ArticleContent.scss';

interface ArticleContentProps {
  article: Article;
  searchKeywords: string;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  article,
  searchKeywords,
}) => {
  return (
    <Paper elevation={0} className="article-content">
      <Typography variant="h4" component="h1" className="article-title">
        <HighlightedText text={article.title} keywords={searchKeywords} />
      </Typography>

      <Typography variant="body1" className="article-body">
        <HighlightedText text={article.description} keywords={searchKeywords} />
      </Typography>
    </Paper>
  );
};

