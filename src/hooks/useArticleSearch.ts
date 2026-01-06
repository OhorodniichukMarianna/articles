import { useMemo } from 'react';
import { Article, SearchMatch } from '../types';

interface UseArticleSearchResult {
  filteredArticles: SearchMatch[];
  hasSearch: boolean;
}

export const useArticleSearch = (
  articles: Article[],
  searchKeywords: string
): UseArticleSearchResult => {
  const filteredArticles = useMemo(() => {
    const trimmedKeywords = searchKeywords.trim();
    
    if (!trimmedKeywords) {
      return articles.map(article => ({
        article,
        matchInTitle: 0,
        matchInDescription: 0,
      }));
    }

    const keywords = trimmedKeywords
      .toLowerCase()
      .split(/\s+/)
      .filter(keyword => keyword.length > 0);

    const matchedArticles: SearchMatch[] = [];

    articles.forEach(article => {
      let matchInTitle = 0;
      let matchInDescription = 0;

      const titleLower = article.title.toLowerCase();
      const descriptionLower = article.description.toLowerCase();

      keywords.forEach(keyword => {
        const titleMatches = (titleLower.match(new RegExp(keyword, 'g')) || []).length;
        const descriptionMatches = (descriptionLower.match(new RegExp(keyword, 'g')) || []).length;

        matchInTitle += titleMatches;
        matchInDescription += descriptionMatches;
      });

      if (matchInTitle > 0 || matchInDescription > 0) {
        matchedArticles.push({
          article,
          matchInTitle,
          matchInDescription,
        });
      }
    });

    matchedArticles.sort((a, b) => {
      if (a.matchInTitle !== b.matchInTitle) {
        return b.matchInTitle - a.matchInTitle;
      }
      return b.matchInDescription - a.matchInDescription;
    });

    return matchedArticles;
  }, [articles, searchKeywords]);

  return {
    filteredArticles,
    hasSearch: searchKeywords.trim().length > 0,
  };
};

