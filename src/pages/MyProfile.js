import React from 'react';
import classes from "./MyProfile.module.css"

function MyProfile() {
  const watchedAnime = [
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
  ];

  const plannedAnime = [
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
  ];

  const postponedAnime = [
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
  ];

  return (
    <div>
      <h2 className={classes.myprofile}>My Profile</h2>

      <h3>Watched Anime</h3>
      <ul>
        {watchedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ul>

      <h3>Planned Anime</h3>
      <ul>
        {plannedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ul>

      <h3>Postponed Anime</h3>
      <ul>
        {postponedAnime.map(anime => (
          <li key={anime.id}>
            {anime.title} ({anime.episodesWatched}/{anime.totalEpisodes})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyProfile;
