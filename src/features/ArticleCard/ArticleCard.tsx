import React from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { CalendarToday, ArrowForward } from '@mui/icons-material';
import { Article } from '../../types';
import { HighlightedText } from '../../components/HighlightedText';
import './ArticleCard.scss';

interface ArticleCardProps {
  article: Article;
  searchKeywords: string;
  onCardClick: (id: number) => void;
}

const truncateDescription = (description: string, maxLength: number = 100): string => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength) + '...';
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  searchKeywords,
  onCardClick,
}) => {
  return (
    <Card className="article-card" elevation={0}>
      <CardActionArea onClick={() => onCardClick(article.id)} className="card-action">
        <CardMedia
          component="img"
          height="217"
          image={article.imageUrl}
          alt={article.title}
          className="card-image"
        />
        <CardContent className="card-content">
          <Box className="date-container">
            <CalendarToday className="calendar-icon" />
            <Typography variant="body2" className="date-text">
              {format(new Date(article.date), 'MMMM do, yyyy')}
            </Typography>
          </Box>

          <Typography variant="h6" component="h2" className="article-title">
            <HighlightedText text={article.title} keywords={searchKeywords} />
          </Typography>

          <Typography variant="body2" className="article-description">
            <HighlightedText
              text={article.description}
              keywords={searchKeywords}
            />
          </Typography>
        </CardContent>
        <Box className="read-more-container">
          <Typography variant="body2" className="read-more-text">
            Read more
          </Typography>
          <ArrowForward className="arrow-icon" />
        </Box>
      </CardActionArea>
    </Card>
  );
};

