import { useEffect } from 'react'
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
    <Link to={`/titleInfo/${title.mal_id}`} key={title.mal_id}> 
      <Title        
        id={title.mal_id}
        image={title.images.jpg.image_url}
        titleName={title.title_english}
        episodes={title.episodes}
      />
    </Link>
  ));
  return (
    <section className={classes.catalog}>
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
