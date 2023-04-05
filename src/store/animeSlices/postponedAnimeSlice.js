import { createSlice } from "@reduxjs/toolkit";

const postponedAnimeSlice = createSlice({
    name: 'postponedAnime',
    initialState: [],    
    reducers: {
      addToPostponed(state, action) {
          state.push(action.payload);
      },
      updatePostponedAnime(state, action) {
        const { id, episodesWatched, score } = action.payload;
        const anime = state.find(a => a.id === id);
        if (anime) {
          anime.episodesWatched = episodesWatched;
          anime.score = score;
        }
      }
  }
})

export const { addToPostponed, updatePostponedAnime } = postponedAnimeSlice.actions

export default postponedAnimeSlice.reducer