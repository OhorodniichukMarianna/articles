import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useGetArticleByIdQuery } from '../services/spaceflightApi';
import { RootState } from '../store/store';
import { ArticleContent } from '../features/ArticleContent/ArticleContent';
import './ArticlePage.scss';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const searchKeywords = useSelector((state: RootState) => state.articles.searchKeywords);

  const { data: article, error, isLoading } = useGetArticleByIdQuery(Number(id), {
    skip: !id,
  });

  const handleBackClick = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <Box className="article-page">
        <Container maxWidth="lg" className="article-container">
          <Box className="loading-container">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading article...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box className="article-page">
        <Container maxWidth="lg" className="article-container">
          <Alert severity="error" sx={{ mt: 4 }}>
            Article not found or failed to load.
          </Alert>
          <Box className="back-link" onClick={handleBackClick} sx={{ mt: 2 }}>
            <ArrowBackIcon className="back-arrow" />
            <Typography variant="body2" className="back-text">
              Back to homepage
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="article-page">
      <Box 
        className="hero-image"
        sx={{
          backgroundImage: `url(${article.imageUrl})`,
        }}
      />

      <Container maxWidth="lg" className="article-container">
        <ArticleContent article={article} searchKeywords={searchKeywords} />

        <Box className="back-link" onClick={handleBackClick}>
          <ArrowBackIcon className="back-arrow" />
          <Typography variant="body2" className="back-text">
            Back to homepage
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

