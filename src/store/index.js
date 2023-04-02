import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import animeReducer from "./animeSlice"
import plannedAnimeReducer from "./animeSlices/plannedAnimeSlice"
import watchedAnimeReducer from "./animeSlices/watchedAnimeSlice"
import postponedAnimeReducer from "./animeSlices/postponedAnimeSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    anime: animeReducer, 
    watchedAnime: watchedAnimeReducer,
    plannedAnime: plannedAnimeReducer,
    postponedAnime: postponedAnimeReducer,
  },
});

export default store;
