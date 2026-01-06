import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticlesResponse, SpaceflightArticle, Article } from '../types';

const transformArticle = (apiArticle: SpaceflightArticle): Article => ({
  id: apiArticle.id,
  title: apiArticle.title,
  description: apiArticle.summary,
  date: apiArticle.published_at,
  imageUrl: apiArticle.image_url,
  url: apiArticle.url,
  newsSite: apiArticle.news_site,
});

interface TransformedArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

export const spaceflightApi = createApi({
  reducerPath: 'spaceflightApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.spaceflightnewsapi.net/v4/' 
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<TransformedArticlesResponse, {
      limit?: number;
      offset?: number;
      search?: string;
      ordering?: string;
      news_site?: string;
    }>({
      query: (params) => ({
        url: 'articles/',
        params: {
          limit: params.limit || 25,
          offset: params.offset || 0,
          ...(params.search && { search: params.search }),
          ...(params.ordering && { ordering: params.ordering }),
          ...(params.news_site && { news_site: params.news_site }),
        },
      }),
      transformResponse: (response: ArticlesResponse): TransformedArticlesResponse => ({
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformArticle),
      }),
    }),
    
    getArticleById: builder.query<Article, number>({
      query: (id) => `articles/${id}/`,
      transformResponse: (response: SpaceflightArticle): Article => transformArticle(response),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
} = spaceflightApi;

