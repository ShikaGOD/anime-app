import { createSlice } from "@reduxjs/toolkit";

const postponedAnimeSlice = createSlice({
    name: 'postponedAnime',
    initialState: [
      {
        id: 5,
        title: 'Death Note',
        episodesWatched: 10,
        totalEpisodes: 37,
      },
      {
        id: 6,
        title: 'Sword Art Online',
        episodesWatched: 5,
        totalEpisodes: 25,
      },
    ],    
    reducers: {
      addToPostponed(state, action) {
          state.push(action.payload);
      }
  }
})

export const { addToPostponed } = postponedAnimeSlice.actions

export default postponedAnimeSlice.reducer