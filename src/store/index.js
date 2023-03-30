import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import plannedAnimeReducer from "./animeSlices/plannedAnimeSlice"
import watchedAnimeReducer from "./animeSlices/watchedAnimeSlice"
import postponedAnimeReducer from "./animeSlices/postponedAnimeSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    watchedAnime: watchedAnimeReducer,
    plannedAnime: plannedAnimeReducer,
    postponedAnime: postponedAnimeReducer,
  },
});

export default store;
