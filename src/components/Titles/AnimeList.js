import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../../store/animeSlice";
import Title from "./Title/Title";
import classes from "./AnimeList.module.css";

function AnimeList() {
  const [showFilterByStatus, setShowFilterByStatus] = useState(false);
  const [showFilterByType, setShowFilterByType] = useState(false);
  const [filter, setFilter] = useState("bypopularity");
  const [type, setType] = useState("tv")
  const titles = useSelector((state) => state.anime.animeTitles);
  const isLoading = useSelector((state) => state.anime.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnimeList({ filter, type }));
  }, [dispatch, filter, type]);

  const buttonFilterByStatusHandler = useCallback(() => {
    setShowFilterByStatus((prevShowFilterByStatus) => !prevShowFilterByStatus);
    
  }, []);
  
  const buttonFilterByTypeHandler = useCallback(() => {
    setShowFilterByType((prevShowFilterByType) => !prevShowFilterByType);
  }, []);
  
  const filterByStatusHandler = (filterByStatus) => {
    switch (filterByStatus) {
      case "Popularity":
        setFilter("bypopularity");
        break;
      case "Upcoming":
        setFilter("upcoming");
        break;
      case "Favorite":
        setFilter("favorite");
        break;
      case "Airing":
        setFilter("airing");
        break;
      default:
        break;
    }
    setShowFilterByStatus((prevShowFilterByStatus) => !prevShowFilterByStatus);
  };

  const filterByTypeHandler = (filterByType) => {
    switch (filterByType) {
      case "TV":
        setType("tv");
        break;
      case "Movie":
        setType("movie");
        break;
      case "OVA":
        setType("ova");
        break;
      case "Special":
        setType("special");
        break;
      default:
        break;
    }
    setShowFilterByType((prevShowFilterByType) => !prevShowFilterByType);
  };

  const animeList = titles.map((title) => (
    <Link to={`/titleInfo/${title.mal_id}`} key={title.mal_id}>
      <Title
        id={title.mal_id}
        image={title.images.jpg.image_url}
        titleName={title.title_english ?? title.title}
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
        <>
        <div className={classes.filterContainer}>
          <button
            className={classes.buttonFilterStatus}
            onClick={buttonFilterByStatusHandler}
          >
            Filter by status
          </button>
          {showFilterByStatus && (
            <ul className={classes.filterStatusList}>
              <li
              className={filter === "bypopularity" ? classes.active : ""}
                onClick={(event) => {
                  filterByStatusHandler("Popularity");
                  event.preventDefault();
                }}
              >
                Popularity
              </li>
              <li
                className={filter === "upcoming" ? classes.active : ""}
                onClick={(event) => {
                  filterByStatusHandler("Upcoming");
                  event.preventDefault();
                }}
              >
                Upcoming
              </li>
              <li
              className={filter === "favorite" ? classes.active : ""}
                onClick={(event) => {
                  filterByStatusHandler("Favorite");
                  event.preventDefault();
                }}
              >
                Favorite
              </li>
              <li
              className={filter === "airing" ? classes.active : ""}
                onClick={(event) => {
                  filterByStatusHandler("Airing");
                  event.preventDefault();
                }}
              >
                Ongoing
              </li>
            </ul>
          )}
          <button
            className={classes.buttonFilterType}
            onClick={buttonFilterByTypeHandler}
          >
            Filter by type
          </button>
          {showFilterByType && (
            <ul className={classes.filterTypeList}>
              <li
              className={type === "tv" ? classes.active : ""}
                onClick={(event) => {
                  filterByTypeHandler("TV");
                  event.preventDefault();
                }}
              >
                TV
              </li>
              <li
                className={type === "movie" ? classes.active : ""}
                onClick={(event) => {
                  filterByTypeHandler("Movie");
                  event.preventDefault();
                }}
              >
                Movie
              </li>
              <li
              className={type === "ova" ? classes.active : ""}
                onClick={(event) => {
                  filterByTypeHandler("OVA");
                  event.preventDefault();
                }}
              >
                OVA
              </li>
              <li
              className={type === "special" ? classes.active : ""}
                onClick={(event) => {
                  filterByTypeHandler("Special");
                  event.preventDefault();
                }}
              >
                Special
              </li>
            </ul>
          )}
        </div>
          <ul className={classes.animeList}>{animeList}</ul>
        </>
      )}
    </section>
  );
}

export default AnimeList;
