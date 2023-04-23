import React, { useState } from 'react';
import classes from "./MyList.module.css"
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateWatchedAnime } from '../../store/animeSlices/watchedAnimeSlice';
import { updatePlannedAnime } from '../../store/animeSlices/plannedAnimeSlice';
import { updatePostponedAnime } from '../../store/animeSlices/postponedAnimeSlice';


function MyList() {
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
    if (episodesWatched >= 0 && episodesWatched <= anime.episodes) {
      const updatedAnime = { ...anime, episodesWatched};
      if (activeList === 'watchedAnime') {
        dispatch(updateWatchedAnime(updatedAnime));
      } else if (activeList === 'plannedAnime') {
        dispatch(updatePlannedAnime(updatedAnime));
        console.log(updatedAnime);
      } else if (activeList === 'postponedAnime') {
        dispatch(updatePostponedAnime(updatedAnime));        
      }
    }
    console.log(episodesWatched);
  };
  
  const onScoreChangeHandler = (event, anime) => {
    const score = Number(event.target.value);
    const episodesWatched = anime.episodesWatched;
    if (score >= 0 && score <= 10) {
      const updatedAnime = { ...anime, score };
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
      <div className={classes.myProfileContainer}>
        <div className={classes.listNav}>
          <a
            className={activeList === 'watchedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('watchedAnime')}
          >
            WATCHED
          </a>
          <a
            className={activeList === 'plannedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('plannedAnime')}
          >
            PLANNED
          </a>
          <a
            className={activeList === 'postponedAnime' ? classes.activeButton : ''}
            onClick={() => setActiveList('postponedAnime')}
          >
            POSTPONED
          </a>
        </div>
        <table className={classes.animeList}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Score</th>
              <th>Episodes</th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>
            {activeAnimeList.map(anime => (
              <tr key={anime.id} >              
                <td>                 
                    <img src={anime.image} alt={anime.title} className={classes.animeImage} />
                    <Link to={`/titleInfo/${anime.id}`}>
                      <span>{anime.title}</span>                                                      
                    </Link>
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
                      value={anime.episodesInput}
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
                      {anime.episodesWatched} / {anime.episodes}
                    </span>
                  )}
                </td>              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MyList;
