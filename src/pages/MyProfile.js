import React, { useState } from 'react';
import classes from "./MyProfile.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { updateWatchedAnime } from '../store/animeSlices/watchedAnimeSlice';
import { updatePlannedAnime } from '../store/animeSlices/plannedAnimeSlice';
import { updatePostponedAnime } from '../store/animeSlices/postponedAnimeSlice';


function MyProfile() {
  const dispatch = useDispatch();

  const [activeList, setActiveList] = useState('watchedAnime');
  const plannedAnime = useSelector((state) => state.plannedAnime);
  const watchedAnime = useSelector((state) => state.watchedAnime);
  const postponedAnime = useSelector((state) => state.postponedAnime);

  let activeAnimeList;
  if (activeList === 'plannedAnime') {
    activeAnimeList = plannedAnime;
  } else if (activeList === 'postponedAnime') {
    activeAnimeList = postponedAnime;
  } else {
    activeAnimeList = watchedAnime;
  }

  const onInputHandler = (event, anime) => {
    const episodesWatched = Number(event.target.value);
    if (episodesWatched >= 0 && episodesWatched <= anime.totalEpisodes) {
      const updatedAnime = { ...anime, episodesWatched };
      if (activeList === 'watchedAnime') {
        dispatch(updateWatchedAnime(updatedAnime));
      } else if (activeList === 'plannedAnime') {
        dispatch(updatePlannedAnime(updatedAnime));
      } else if (activeList === 'postponedAnime') {
        dispatch(updatePostponedAnime(updatedAnime));
      }
    }
  };

  const [editAnimeId, setEditAnimeId] = useState(null);

  return (
    <>
      <h1>My Profile</h1>
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <button
            className={activeList === 'watchedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('watchedAnime')}
          >
            WATCHED
          </button>
          <button
            className={activeList === 'plannedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('plannedAnime')}
          >
            PLANNED
          </button>
          <button
            className={activeList === 'postponedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('postponedAnime')}
          >
            POSTPONED
          </button>
        </div>
        <ol className={classes.animeList}>
          {activeAnimeList.map(anime => (
            <li key={anime.id}>
              <span>{anime.title}</span>
              {editAnimeId === anime.id ? (
                <input
                  type="number"
                  value={anime.episodesWatched}
                  min={0}
                  max={anime.totalEpisodes}
                  onChange={(event) => onInputHandler(event, anime)}
                  onMouseLeave={() => setEditAnimeId(null)}
                />
              ) : (
                <span
                  className={classes.episodesWatched}
                  onMouseEnter={() => setEditAnimeId(anime.id)}
                >
                  {anime.episodesWatched} / {anime.totalEpisodes}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default MyProfile;
