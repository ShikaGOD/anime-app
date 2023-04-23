import { createSlice } from "@reduxjs/toolkit";

function checkIfAdded(state, id) {
  return state.some(anime => anime.id === id);
}

const plannedAnimeSlice = createSlice({
    name: 'plannedAnime',
    initialState: [],    
    reducers: {
      addToPlanned(state, action) {
        const { id, title, image, episodes } = action.payload;
        if (!checkIfAdded(state, id)) {
        state.push({
            id,
            title,
            image,
            episodes,
            episodesWatched: 0,
            score: "-"
        });
      }
    },
    updatePlannedAnime(state, action) {
      const { id, episodesWatched, score } = action.payload;
      const anime = state.find(a => a.id === id);
      if (anime) {
        anime.episodesWatched = episodesWatched;
        anime.score = score;
      }
    }
    }
})

export const { addToPlanned, updatePlannedAnime } = plannedAnimeSlice.actions

export default plannedAnimeSlice.reducer