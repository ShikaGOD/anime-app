import { createSlice } from "@reduxjs/toolkit";

const plannedAnimeSlice = createSlice({
    name: 'plannedAnime',
    initialState: [
        {
          id: 3,
          title: '91 days',
          episodesWatched: 0,
          totalEpisodes: 12,
          score: "-"
        },
        {
          id: 4,
          title: 'Naruto',
          episodesWatched: 0,
          totalEpisodes: 220,
          score: "-"
        },
      ],    
    reducers: {
        addToPlanned(state, action) {
            state.push(action.payload);
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