import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnimeList = createAsyncThunk(
  "anime/fetchAnimeList",
  async ({ filter, type }) => {
    const typeString = String(type);
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${filter}&limit=24&type=${type}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    const { data } = responseData;
    // console.log(data);
    return data;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    animeTitles: [],
    isLoading: true,
    error: null,
    searchResults: [],
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
  },
});

export default animeSlice.reducer;
