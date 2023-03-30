import { useState } from "react";
import { useDispatch } from "react-redux";
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
        dispatch(addToWatched({id: props.id, title: props.titleName}));
        break;
      case "planned":
        dispatch(addToPlanned({id: props.id, title: props.titleName}));
        break;
      case "postponed":
        dispatch(addToPostponed({id: props.id, title: props.titleName}));
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
          <button className={classes.addButton} onClick={addButtonHandler}>
            Add
          </button>
          {showDropdown && (
            <ul className={classes.dropdownMenu}>
              <li onClick={() => dropdownItemHandler("watched")}>
                + Watched Anime
              </li>
              <li onClick={() => dropdownItemHandler("planned")}>
                +Planned Anime
              </li>
              <li onClick={() => dropdownItemHandler("postponed")}>
              + Postponed Anime
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
