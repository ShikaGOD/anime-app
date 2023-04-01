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
      },
      updateWatchedAnime(state, action) {
        const { id, episodesWatched } = action.payload;
        const anime = state.find(a => a.id === id);
        if (anime) {
          anime.episodesWatched = episodesWatched;
        }
      }
  }
})

export const { addToWatched, updateWatchedAnime } = watchedAnimeSlice.actions

export default watchedAnimeSlice.reducer