import { createSlice } from "@reduxjs/toolkit";

const postponedAnimeSlice = createSlice({
    name: 'postponedAnime',
    initialState: [],    
    reducers: {
      addToPostponed(state, action) {
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