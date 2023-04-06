import { createSlice } from "@reduxjs/toolkit";

const watchedAnimeSlice = createSlice({
    name: 'watchedAnime',
    initialState: [],    
    reducers: {
      addToWatched(state, action) {
        const { id, title, image, episodes } = action.payload;
        state.push({
            id,
            title,
            image,
            episodes,
            episodesWatched: 0,
            score: "-"
        });
      },
      updateWatchedAnime(state, action) {
        const { id, episodesWatched, score } = action.payload;
        const anime = state.find(a => a.id === id);
        if (anime) {
          anime.episodesWatched = episodesWatched;
          anime.score = score;
        }
      }
  }
})

export const { addToWatched, updateWatchedAnime } = watchedAnimeSlice.actions

export default watchedAnimeSlice.reducer