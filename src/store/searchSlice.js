import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnimeSearchResults = createAsyncThunk(
  "search/fetchAnimeSearchResults",
  async (query) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    const { data } = responseData;
    return data.map(({ mal_id, title_english, title, images }) => ({
      value: mal_id,
      name: title_english ?? title,
      image: images?.jpg?.image_url ?? null,
    }));
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchAnimeSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
