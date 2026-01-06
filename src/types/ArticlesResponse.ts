import { SpaceflightArticle } from './SpaceflightArticle';

export interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SpaceflightArticle[];
}

