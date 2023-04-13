import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAnimeList } from '../../store/animeSlice';
import Title from "./Title/Title";
import classes from "./AnimeList.module.css";


function AnimeList() {
  const titles = useSelector(state => state.anime.animeTitles);
  const isLoading = useSelector(state => state.anime.isLoading);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAnimeList());
  }, [dispatch]);
  
  const animeList = titles.map((title) => (    
    <Link to={`/titleDetail/${title.mal_id}`}> 
      <Title
        key={title.mal_id}
        id={title.mal_id}
        image={title.images.jpg.image_url}
        titleName={title.title}
        episodes={title.episodes}
      />
    </Link>
  ));
  return (
    <section>
      {isLoading ? (
        <section className={classes.animeSpinner}>
          <div className={classes.spinner} />
        </section>
      ) : (
        <ul className={classes.container}>{animeList}</ul>
      )}
    </section>
  );
}

export default AnimeList;
