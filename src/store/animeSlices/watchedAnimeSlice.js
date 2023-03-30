import { createSlice } from "@reduxjs/toolkit";

const watchedAnimeSlice = createSlice({
    name: 'watchedAnime',
    initialState: [
      {
        id: 1,
        title: 'Attack on Titan',
        episodesWatched: 25,
        totalEpisodes: 25,
      },
      {
        id: 2,
        title: 'Fullmetal Alchemist: Brotherhood',
        episodesWatched: 64,
        totalEpisodes: 64,
      },
    ],    
    reducers: {
      addToWatched(state, action) {
          state.push(action.payload);
      }
  }
})

export const { addToWatched } = watchedAnimeSlice.actions

export default watchedAnimeSlice.reducer