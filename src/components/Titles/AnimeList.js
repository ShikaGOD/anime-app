import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../../store/animeSlice";
import Title from "./Title/Title";
import classes from "./AnimeList.module.css";

function AnimeList() {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("bypopularity");
  const titles = useSelector((state) => state.anime.animeTitles);
  const isLoading = useSelector((state) => state.anime.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnimeList(filter));
  }, [dispatch, filter]);

  const buttonFilterHandler = useCallback(() => {
    setShowFilter((prevShowFilter) => !prevShowFilter);
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
    setShowFilter((prevShowFilter) => !prevShowFilter);
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
        <div className={classes.filterContainer}>
          <button
            className={classes.buttonFilter}
            onClick={buttonFilterHandler}
          >
            Filter by status
          </button>
          {showFilter && (
            <ul className={classes.filterList}>
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
          <ul className={classes.container}>{animeList}</ul>
        </div>
      )}
    </section>
  );
}

export default AnimeList;
