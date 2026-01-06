import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArticlesState {
  searchKeywords: string;
}

const initialState: ArticlesState = {
  searchKeywords: '',
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSearchKeywords: (state, action: PayloadAction<string>) => {
      state.searchKeywords = action.payload;
    },
  },
});

export const { setSearchKeywords } = articlesSlice.actions;
export default articlesSlice.reducer;

