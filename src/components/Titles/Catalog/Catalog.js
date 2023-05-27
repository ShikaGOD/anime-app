import classes from "./Catalog.module.css";
import Title from "../Title/Title";
import Paginate from "../Paginate/Paginate";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom";
import { fetchAnimeList } from "../../../store/animeSlice";
import slugify from "slugify";

function Catalog() {
  // const { titleId } = useParams();
  const [showFilterByStatus, setShowFilterByStatus] = useState(false);
  const [showFilterByType, setShowFilterByType] = useState(false);
  const titles = useSelector((state) => state.anime.animeTitles);
  const totalPages = useSelector((state) => state.anime.totalPages);
  const isLoading = useSelector((state) => state.anime.isLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "bypopularity";
  const type = searchParams.get("type") || "tv";
  const currentPageParam = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageParam);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFilter = (newFilter) => {
    setSearchParams((params) => {
      params.set("filter", newFilter);
      return params;
    });
  };

  const updateType = (newType) => {
    setSearchParams((params) => {
      params.set("type", newType);
      return params;
    });
  };

  useEffect(() => {
    dispatch(fetchAnimeList({ filter, type, page: currentPage }));
  }, [dispatch, filter, type, currentPage]);

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
        updateFilter("bypopularity");
        break;
      case "Upcoming":
        updateFilter("upcoming");
        break;
      case "Favorite":
        updateFilter("favorite");
        break;
      case "Airing":
        updateFilter("airing");
        break;
      default:
        break;
    }
    setShowFilterByStatus((prevShowFilterByStatus) => !prevShowFilterByStatus);
  };

  const filterByTypeHandler = (filterByType) => {
    switch (filterByType) {
      case "TV":
        updateType("tv");
        break;
      case "Movie":
        updateType("movie");
        break;
      case "OVA":
        updateType("ova");
        break;
      case "Special":
        updateType("special");
        break;
      default:
        break;
    }
    setShowFilterByType((prevShowFilterByType) => !prevShowFilterByType);
  };
  
  const animeList = titles.map((title) => {
    // const slug = slugify(title.title, { lower: true });
    return (
      <Link to={`/catalog/${title.mal_id}`} key={title.mal_id}>
        <Title
          id={title.mal_id}
          image={title.images.jpg.image_url}
          titleName={title.title_english ?? title.title}
          episodes={title.episodes}
        />
      </Link>
    );
  });

  const pageChangeHandler = ({ selected }) => {
    const newPage = selected + 1;
    setSearchParams((params) => {
      params.set("page", newPage.toString());
      return params;
    });
    setCurrentPage(newPage);
  };

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

            <button
              className={classes.buttonFilterType}
              onClick={buttonFilterByTypeHandler}
            >
              Filter by type
            </button>
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
              <ul className={classes.filterStatusList}>
                <li
                  className={filter === "bypopularity" ? classes.active : ""}
                  onClick={(event) => {
                    filterByStatusHandler("Popularity");
                    // navigate("filter?status=bypopularity");
                    event.preventDefault();
                  }}
                >
                  Popularity
                </li>

                <li
                  className={filter === "upcoming" ? classes.active : ""}
                  onClick={(event) => {
                    filterByStatusHandler("Upcoming");
                    // navigate("filter?status=upcoming");
                    event.preventDefault();
                  }}
                >
                  Upcoming
                </li>

                <li
                  className={filter === "favorite" ? classes.active : ""}
                  onClick={(event) => {
                    filterByStatusHandler("Favorite");
                    // navigate('filter?status=favorite');
                    event.preventDefault();
                  }}
                >
                  Favorite
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
          <Paginate
            currentPage={currentPage}
            onPageChange={pageChangeHandler}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
}

export default Catalog;
