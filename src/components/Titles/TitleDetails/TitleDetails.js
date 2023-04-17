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
      <div className={classes.titleInfo}>
        <h1>{animeInfo.title_english.toUpperCase()}</h1>
        <div className={classes.genres}>
          {animeInfo.genres.map((genre) => (
            <div className={classes.genre} key={genre.mal_id}>
              {genre.name}
            </div>
          ))}
        </div>
        <img
          className={classes.titleImage}
          src={animeInfo.images.jpg.large_image_url}
          alt={animeInfo.title}
        />
        <button className={classes.titleButton}>Add</button>
      </div>

      <div className={classes.trailerSynopsis}>
        <p className={classes.synopsis}>{animeInfo.synopsis}</p>              
        <div className={classes.trailer}>
            <iframe
              title={`${animeInfo.title} trailer`}
              height="500"
              src={animeInfo.trailer.embed_url}
              frameBorder="0"
              allowFullScreen
            />
        </div>        
      </div>
    </section>
  );
}

export default TitleDetails;
