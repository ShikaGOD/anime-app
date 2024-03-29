import { createSlice } from "@reduxjs/toolkit";

function checkIfAdded(state, id) {
  return state.some((anime) => anime.id === id);
}

// Function to get the stored list from local storage
function getStoredAnimeList(userId, key) {
  const storedList = localStorage.getItem(`${userId}_${key}`);
  return storedList ? JSON.parse(storedList) : [];
}

// Function to update the stored list in local storage
function updateStoredAnimeList(userId, key, list) {
  localStorage.setItem(`${userId}_${key}`, JSON.stringify(list));
}

const userId = localStorage.getItem("userId");

const watchedAnimeSlice = createSlice({
  name: "watchedAnime",
  initialState: getStoredAnimeList(userId, "watchedAnime"),
  reducers: {
    addToWatched(state, action) {
      const { id, title, image, episodes } = action.payload;
      if (!checkIfAdded(state, id)) {
        state.push({
          id,
          title,
          image,
          episodes,
          episodesWatched: 0,
          score: "-",
        });
        updateStoredAnimeList(userId, "watchedAnime", state);
      }
    },
    updateWatchedAnime(state, action) {
      const { id, episodesWatched, score } = action.payload;
      const anime = state.find((a) => a.id === id);
      if (anime) {
        anime.episodesWatched = episodesWatched;
        anime.score = score;
        updateStoredAnimeList(userId, "watchedAnime", state);
      }
    },
  },
});

export const { addToWatched, updateWatchedAnime } = watchedAnimeSlice.actions;

export default watchedAnimeSlice.reducer;
