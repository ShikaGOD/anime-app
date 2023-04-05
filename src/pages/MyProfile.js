import React, { useState } from 'react';
import classes from "./MyProfile.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { updateWatchedAnime } from '../store/animeSlices/watchedAnimeSlice';
import { updatePlannedAnime } from '../store/animeSlices/plannedAnimeSlice';
import { updatePostponedAnime } from '../store/animeSlices/postponedAnimeSlice';


function MyProfile() {
  const dispatch = useDispatch();

  const [activeList, setActiveList] = useState('watchedAnime');
  const [editEpisodesId, setEditEpisodesId] = useState(null);
  const [editScoreId, setEditScoreId] = useState(null);
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
    const score = editScoreId;
    if (episodesWatched >= 0 && episodesWatched <= anime.totalEpisodes) {
      const updatedAnime = { ...anime, episodesWatched, score };
      if (activeList === 'watchedAnime') {
        dispatch(updateWatchedAnime(updatedAnime));
      } else if (activeList === 'plannedAnime') {
        dispatch(updatePlannedAnime(updatedAnime));
      } else if (activeList === 'postponedAnime') {
        dispatch(updatePostponedAnime(updatedAnime));
      }
    }
  };
  
  const onScoreChangeHandler = (event, anime) => {
    const score = Number(event.target.value);
    const episodesWatched = anime.episodesWatched;
    if (score >= 0 && score <= 10) {
      const updatedAnime = { ...anime, score, episodesWatched };
      if (activeList === 'watchedAnime') {
      dispatch(updateWatchedAnime(updatedAnime));
      console.log(updatedAnime);
      } else if (activeList === 'plannedAnime') {
      dispatch(updatePlannedAnime(updatedAnime));
      console.log(updatedAnime);
      } else if (activeList === 'postponedAnime') {
      dispatch(updatePostponedAnime(updatedAnime));
      console.log(updatedAnime);
      }
      }
  };
  
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
        <table className={classes.animeList}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Score</th>
              <th>Episodes</th>
            </tr>
          </thead>
          <tbody>
            {activeAnimeList.map(anime => (
              <tr key={anime.id}>
              <div className={classes.tbody}>
                <td>                 
                    <img src={anime.image} alt={anime.title} className={classes.animeImage} />
                    <span>{anime.title}</span>                                                      
                </td>
                  <td>
                    {editScoreId === anime.id ? (
                      <input
                        className={classes.scoreInput}
                        type="number"
                        value={anime.score}
                        min={0}
                        max={10}
                        onChange={(event) => onScoreChangeHandler(event, anime)}
                        onMouseLeave={() => setEditScoreId(null)}   
                        onFocus={(e) => e.target.select()}           
                      />
                    ) : (
                      <span
                      className={classes.ratingValue}
                      onMouseEnter={() => setEditScoreId(anime.id)}
                    >
                      {anime.score}
                    </span>
                    )}
                  </td>
                <td>
                  {editEpisodesId === anime.id ? (
                    <input
                      type="number"
                      value={anime.episodesWatched}
                      min={0}
                      max={anime.episodes}
                      onChange={(event) => onInputHandler(event, anime)}
                      onMouseLeave={() => setEditEpisodesId(null)}
                      onFocus={(e) => e.target.select()}
                    />
                  ) : (
                    <span
                      className={classes.episodesWatched}
                      onMouseEnter={() => setEditEpisodesId(anime.id)}
                    >
                      0 / {anime.episodes}
                    </span>
                  )}
                </td>
              </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyProfile;
