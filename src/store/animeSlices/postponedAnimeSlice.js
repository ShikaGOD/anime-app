import { createSlice } from "@reduxjs/toolkit";

const postponedAnimeSlice = createSlice({
    name: 'postponedAnime',
    initialState: [
      {
        id: 5,
        title: 'Death Note',
        episodesWatched: 0,
        totalEpisodes: 37,
      },
      {
        id: 6,
        title: 'Sword Art Online',
        episodesWatched: 0,
        totalEpisodes: 25,
      },
    ],    
    reducers: {
      addToPostponed(state, action) {
          state.push(action.payload);
      },
      updatePostponedAnime(state, action) {
        const { id, episodesWatched } = action.payload;
        const anime = state.find(a => a.id === id);
        if (anime) {
          anime.episodesWatched = episodesWatched;
        }
      }
  }
})

export const { addToPostponed, updatePostponedAnime } = postponedAnimeSlice.actions

export default postponedAnimeSlice.reducer