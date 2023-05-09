import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnimeList = createAsyncThunk(
  "anime/fetchAnimeList",
  async ({ filter, type, page }) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${filter}&limit=24&type=${type}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    const { data, pagination } = responseData;
    const totalPages = pagination.last_visible_page
    // console.log(totalPages);
    // console.log(data, pagination);
    console.log(responseData);
    return responseData;
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    animeTitles: [],
    totalPages: 0,
    isLoading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.animeTitles = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;
