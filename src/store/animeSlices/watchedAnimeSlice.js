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

})

export default watchedAnimeSlice.reducer