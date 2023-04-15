import classes from './TitleDetails.module.css'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function TitleDetails() {
  const { titleId } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const isLoading = useSelector(state => state.anime.isLoading);

  useEffect(() => {
    const fetchAnimeInfo = async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${titleId}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      setAnimeInfo(responseData.data);
    };
    fetchAnimeInfo();
  }, [titleId]);

  if (isLoading || !animeInfo) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <h1>{animeInfo.title}</h1>
        <p>{animeInfo.rating}</p>
        <div className={classes.genres}>
          {animeInfo.genres.map((genre) => (
            <div className={classes.genre} key={genre.mal_id}>
              {genre.name}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.titleInfo}>
        <img
          className={classes.titleImage}
          src={animeInfo.images.jpg.large_image_url}
          alt={animeInfo.title}
        />
        <div className={classes.titleInfoList}>
          <ul>
            <li>Type: <b>{animeInfo.type}</b></li>
            <li>Episodes: <b>{animeInfo.episodes}</b></li>
            <li>Score: <b>{animeInfo.score}</b></li>
            <li>Studio: <b>{animeInfo.studios.map((studio) => studio.name).join(", ")}</b></li>
          </ul>
          <ul>
            <li>Rank: <b>{animeInfo.rank}</b></li>
            <li>Japanese: <b>{animeInfo.title_japanese}</b></li>
            <li>Source: <b>{animeInfo.source}</b></li>
            <li>Year: <b>{animeInfo.year}</b></li>
          </ul>
        </div>
      </div>
      <p className={classes.synopsis}>{animeInfo.synopsis}</p>
    </section>
  );
}

export default TitleDetails;
