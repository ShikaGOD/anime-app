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

const postponedAnimeSlice = createSlice({
    name: 'postponedAnime',
    initialState: getStoredAnimeList(userId, 'postponedAnime'),    
    reducers: {
      addToPostponed(state, action) {
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
        updateStoredAnimeList(userId, 'postponedAnime', state);
      }
      },
      updatePostponedAnime(state, action) {
        const { id, episodesWatched, score } = action.payload;
        const anime = state.find(a => a.id === id);
        if (anime) {
          anime.episodesWatched = episodesWatched;
          anime.score = score;
          updateStoredAnimeList(userId, 'postponedAnime', state);
        }
      }
  }
})

export const { addToPostponed, updatePostponedAnime } = postponedAnimeSlice.actions

export default postponedAnimeSlice.reducer