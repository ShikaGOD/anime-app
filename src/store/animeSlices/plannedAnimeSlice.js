import { createSlice } from "@reduxjs/toolkit";

const plannedAnimeSlice = createSlice({
    name: 'plannedAnime',
    initialState: [
        {
          id: 3,
          title: 'One Punch Man',
          episodesWatched: 0,
          totalEpisodes: 12,
        },
        {
          id: 4,
          title: 'Naruto',
          episodesWatched: 0,
          totalEpisodes: 220,
        },
      ],    
    reducers: {
        addToPlanned(state, action) {
            state.push(action.payload);
        },
        updatePlannedAnime(state, action) {
          const { id, episodesWatched } = action.payload;
          const anime = state.find(a => a.id === id);
          if (anime) {
            anime.episodesWatched = episodesWatched;
          }
        }
    }
})

export const { addToPlanned, updatePlannedAnime } = plannedAnimeSlice.actions

export default plannedAnimeSlice.reducer