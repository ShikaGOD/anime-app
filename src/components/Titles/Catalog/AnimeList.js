import classes from "./AnimeList.module.css";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnimeList } from "../../../store/animeSlice";
import Title from "../Title/Title";
import FilterList from "./FilterList";

function AnimeList() {
  const [showFilterByStatus, setShowFilterByStatus] = useState(false);
  const [showFilterByType, setShowFilterByType] = useState(false);
  const [filter, setFilter] = useState("bypopularity");
  const [type, setType] = useState("tv");
  const titles = useSelector((state) => state.anime.animeTitles);
  const isLoading = useSelector((state) => state.anime.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnimeList({ filter, type }));
  }, [dispatch, filter, type]);

  const buttonFilterByStatusHandler = useCallback(() => {
    setShowFilterByStatus((prevShowFilterByStatus) => !prevShowFilterByStatus);
    setShowFilterByType(false);
  }, []);

  const buttonFilterByTypeHandler = useCallback(() => {
    setShowFilterByType((prevShowFilterByType) => !prevShowFilterByType);
    setShowFilterByStatus(false);
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
        <>
          <div className={classes.filterContainer}>
            <button
              className={classes.buttonFilterStatus}
              onClick={buttonFilterByStatusHandler}
            >
              Filter by status
            </button>
            {showFilterByStatus && (
              <FilterList
              filterClasses={classes.filterStatusList}
              list={["Popularity", "Upcoming", "Favorite", "Airing"]}
              activeFilter={filter}
              onFilterSelect={filterByStatusHandler}
            />
            )}
            <button
              className={classes.buttonFilterType}
              onClick={buttonFilterByTypeHandler}
            >
              Filter by type
            </button>
            {showFilterByType && (
               <FilterList
               filterClasses={classes.filterTypeList}
               list={["TV", "Movie", "OVA", "Special"]}
               activeFilter={type}
               onFilterSelect={filterByTypeHandler}
             />
            )}
          </div>
          <section className={classes.animeSpinner}>
            <div className={classes.spinner} />
          </section>
        </>
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
              <FilterList
                filterClasses={classes.filterStatusList}
                list={["Popularity", "Upcoming", "Favorite", "Airing"]}
                activeFilter={filter}
                onFilterSelect={filterByStatusHandler}
              />
            )}
            <button
              className={classes.buttonFilterType}
              onClick={buttonFilterByTypeHandler}
            >
              Filter by type
            </button>
            {showFilterByType && (
              <FilterList
                filterClasses={classes.filterTypeList}
                list={["TV", "Movie", "OVA", "Special"]}
                activeFilter={type}
                onFilterSelect={filterByTypeHandler}
              />
            )}
          </div>
          <ul className={classes.animeList}>{animeList}</ul>
        </>
      )}
    </section>
  );
}

export default AnimeList;
