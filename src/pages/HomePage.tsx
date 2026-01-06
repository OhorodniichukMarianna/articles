import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search } from '@mui/icons-material';
import { useGetArticlesQuery } from '../services/spaceflightApi';
import { setSearchKeywords } from '../store/articlesSlice';
import { RootState } from '../store/store';
import { useArticleSearch } from '../hooks/useArticleSearch';
import { ArticleCard } from '../features/ArticleCard/ArticleCard';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const searchKeywords = useSelector((state: RootState) => state.articles.searchKeywords);
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetArticlesQuery({
    limit: 25,
    search: searchKeywords || undefined,
  });

  const articles = data?.results || [];
  
  const { filteredArticles } = useArticleSearch(articles, searchKeywords);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeywords(event.target.value));
  };

  const handleCardClick = (id: number) => {
    navigate(`/article/${id}`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" className="home-page">
        <Box className="loading-container">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading spaceflight news...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="home-page">
        <Alert severity="error">
          Failed to load articles. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="home-page">
      <Box className="search-section">
        <Typography variant="body1" className="search-label">
          Filter by keywords
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="The most successful IT companies in 2020"
          value={searchKeywords}
          onChange={handleSearchChange}
          className="search-field"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="search-icon" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box className="results-section">
        <Typography variant="body1" className="results-text">
          Results: {filteredArticles.length}
        </Typography>
        <Divider className="results-divider" />
      </Box>

      <Grid container spacing={5.625} className="articles-grid">
        {filteredArticles.map(({ article }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={article.id}>
            <ArticleCard
              article={article}
              searchKeywords={searchKeywords}
              onCardClick={handleCardClick}
            />
          </Grid>
        ))}
      </Grid>

      {filteredArticles.length === 0 && !isLoading && (
        <Box className="no-results">
          <Typography variant="h6">No articles found</Typography>
          <Typography variant="body2">
            Try different keywords or clear the search
          </Typography>
        </Box>
      )}
    </Container>
  );
};

