import React from 'react';
import classes from "./MyProfile.module.css"
import { useSelector } from 'react-redux';

function MyProfile() {
  const plannedAnime = useSelector((state) => state.plannedAnime );
  const watchedAnime = useSelector((state) => state.plannedAnime );
  const postponedAnime = useSelector((state) => state.plannedAnime );
  
  console.log(plannedAnime);
  

  return (
    <div className={classes.container}>
      <h1>My Profile</h1>

      <h2>Watched Anime</h2>
      <ol>
        {watchedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ol>

      <h2>Planned Anime</h2>
      <ol>
        {plannedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ol>

      <h2>Postponed Anime</h2>
      <ol>
        {postponedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MyProfile;
