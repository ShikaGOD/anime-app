import { useEffect, useState } from 'react'

import Title from "./Title/Title";
import classes from "./AnimeList.module.css";


function AnimeList() {
  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTitles = async () => {
      const response = await fetch(
        'https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=100'
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const { data } = responseData;
      
      // Отримання властивостей з об'єкту "data"
      // const titles = data.map(anime => ({title: anime.title, mal_id: anime.mal_id}));
      setTitles( data );
      setIsLoading(false);
    };
    
    fetchTitles().catch((error) => {
      setIsLoading(false);
    });
  }, []);
  console.log(titles);

  if (isLoading) {
    return (
      <section className={classes.animeSpinner}>
        <div className={classes.spinner} />
      </section>
    );
  }
  
  const animeList = titles.map((title) => (
      <Title
        key={title.mal_id}
        id={title.mal_id}
        image={title.images.jpg.image_url}
        titleName={title.title}
        episodes={title.episodes}
      />
  ));
  return (
      <section>
        <ul className={classes.container}>{animeList}</ul>
      </section>
   
  );
}

export default AnimeList;
