import { createSlice } from "@reduxjs/toolkit";

function checkIfAdded(state, id) {
  return state.some(anime => anime.id === id);
}

const userId = localStorage.getItem("userId");

function getStoredAnimeList(userId, key) {
  const storedList = localStorage.getItem(`${userId}_${key}`);
  return storedList ? JSON.parse(storedList) : [];
}

function updateStoredAnimeList(userId, key, list) {
  localStorage.setItem(`${userId}_${key}`, JSON.stringify(list));
}

const plannedAnimeSlice = createSlice({
    name: 'plannedAnime',
    initialState: getStoredAnimeList(userId, 'plannedAnime'),    
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
        updateStoredAnimeList(userId, 'plannedAnime', state);
      }
    },
    updatePlannedAnime(state, action) {
      const { id, episodesWatched, score } = action.payload;
      const anime = state.find(a => a.id === id);
      if (anime) {
        anime.episodesWatched = episodesWatched;
        anime.score = score;
        updateStoredAnimeList(userId, 'plannedAnime', state);
      }
    }
    }
})

export const { addToPlanned, updatePlannedAnime } = plannedAnimeSlice.actions

export default plannedAnimeSlice.reducer