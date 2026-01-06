import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { spaceflightApi } from '../services/spaceflightApi';
import articlesReducer from './articlesSlice';

export const store = configureStore({
  reducer: {
    [spaceflightApi.reducerPath]: spaceflightApi.reducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spaceflightApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

