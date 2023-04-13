import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToPlanned } from "../../../store/animeSlices/plannedAnimeSlice";
import { addToWatched } from "../../../store/animeSlices/watchedAnimeSlice";
import { addToPostponed } from "../../../store/animeSlices/postponedAnimeSlice";
import classes from "./Title.module.css";

function Title(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const addButtonHandler = () => {
    setShowDropdown(prevShowDropdown => !prevShowDropdown);
  };

  const dropdownItemHandler = (list) => {
    switch (list) {
      case "watched":
        dispatch(addToWatched({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      case "planned":
        dispatch(addToPlanned({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      case "postponed":
        dispatch(addToPostponed({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  return (
    
      <li
        className={classes.container}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShowDropdown(false);
        }}
      >
        <div className={classes.card}>
          <img src={props.image} alt={props.titleName} />
        {hovered && (
          <div>
            <button className={classes.addButton} onClick={(event) => {
              // event.stopPropagation();
              event.preventDefault();
              addButtonHandler();        
            }}>
              Add
            </button>
            {showDropdown && (
              <ul className={classes.dropdownMenu}>
                <li onClick={(event) => {
                  dropdownItemHandler("watched");
                  event.preventDefault();
                    }                
                  }>
                  + Watched
                </li>
                <li onClick={(event) => {
                  event.preventDefault();
                  dropdownItemHandler("planned")}}>
                  + Planned
                </li>
                <li onClick={(event) => {
                  event.preventDefault();
                  dropdownItemHandler("postponed")}}>
                + Postponed
                </li>
              </ul>
            )}
          </div>
        )}
        </div>
        <div>
          <p>{props.titleName}</p>
        </div>
      </li>
    
  );
}

export default Title;
