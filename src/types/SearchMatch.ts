import { Article } from './Article';

export interface SearchMatch {
  article: Article;
  matchInTitle: number;
  matchInDescription: number;
}

