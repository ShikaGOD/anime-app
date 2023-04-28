import classes from "./TitleDetails.module.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToPlanned } from "../../../store/animeSlices/plannedAnimeSlice";
import { addToWatched } from "../../../store/animeSlices/watchedAnimeSlice";
import { addToPostponed } from "../../../store/animeSlices/postponedAnimeSlice";
import { useParams } from "react-router-dom";

function TitleDetails() {
  const { titleId } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const isLoading = useSelector((state) => state.anime.isLoading);
  const dispatch = useDispatch();

  const addButtonHandler = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const dropdownItemHandler = (list) => {
    switch (list) {
      case "watched":
        dispatch(
          addToWatched({
            id: animeInfo.mal_id,
            image: animeInfo.images.jpg.image_url,
            title: animeInfo.title_english,
            episodes: animeInfo.episodes,
          })
        );
        break;
      case "planned":
        dispatch(
          addToPlanned({
            id: animeInfo.mal_id,
            image: animeInfo.images.jpg.image_url,
            title: animeInfo.title_english,
            episodes: animeInfo.episodes,
          })
        );
        break;
      case "postponed":
        dispatch(
          addToPostponed({
            id: animeInfo.mal_id,
            image: animeInfo.images.jpg.image_url,
            title: animeInfo.title_english,
            episodes: animeInfo.episodes,
          })
        );
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

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
      <section className={classes.animeSpinner}>
        <div className={classes.spinner} />
      </section>
    );
  }

  return (
    <section className={classes.container}>
      <div className={classes.titleInfo}>
        <h1>{animeInfo.title.toUpperCase()}</h1>
        <div className={classes.genres}>
          {animeInfo.genres.map((genre) => (
            <div className={classes.genre} key={genre.mal_id}>
              {genre.name}
            </div>
          ))}
        </div>
        <div className={classes.titleButtonWrapper}>
          <img
            className={classes.titleImage}
            src={animeInfo.images.jpg.large_image_url}
            alt={animeInfo.title}
          />
          <button
            className={classes.titleButton}
            onClick={(event) => {
              event.preventDefault();
              addButtonHandler();
            }}
          >
            Add to list
          </button>
          {showDropdown && (
            <div className={classes.dropdownWrapper}>
              <ul className={classes.dropdown}>
                <li
                  onClick={(event) => {
                    dropdownItemHandler("watched");
                    event.preventDefault();
                  }}
                >
                  + Watched
                </li>
                <li
                  onClick={(event) => {
                    event.preventDefault();
                    dropdownItemHandler("planned");
                  }}
                >
                  + Planned
                </li>
                <li
                  onClick={(event) => {
                    event.preventDefault();
                    dropdownItemHandler("postponed");
                  }}
                >
                  + Postponed
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={classes.trailerSynopsis}>
        <p className={classes.synopsis}>{animeInfo.synopsis}</p>
        {animeInfo.trailer.embed_url ? (
          <div className={classes.trailer}>
            <iframe
              title={`${animeInfo.title} trailer`}
              height="400"
              src={animeInfo.trailer.embed_url}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={classes.trailer}>
            <p className={classes.rickroll}>If you see this, so trailer for this title is unavailable. Just enjoy Rick Astley</p>
            <iframe
              title='RickAstley'
              className={classes.rickrollVideo}
              height="400"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default TitleDetails;
