import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchAnimeList = createAsyncThunk(
  'anime/fetchAnimeList',
  async () => {
    const numPages = 2; // 100 titles / 25 titles per page = 4 pages
    const promises = [];

    for (let i = 1; i <= numPages; i++) {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${i}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const { data } = responseData;
      promises.push(data);
    }

    const animeList = promises.flat();
    console.log(animeList);
    return animeList;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    animeTitles: [],
    isLoading: true,
    error: null,
    searchResults: [],
  },
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animeTitles = action.payload;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSearchResults, clearSearchResults } = animeSlice.actions

export default animeSlice.reducer;
