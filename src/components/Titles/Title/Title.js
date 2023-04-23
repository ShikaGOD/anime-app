import { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { addToPlanned } from "../../../store/animeSlices/plannedAnimeSlice";
import { addToWatched } from "../../../store/animeSlices/watchedAnimeSlice";
import { addToPostponed } from "../../../store/animeSlices/postponedAnimeSlice";
import classes from "./Title.module.css";

function Title(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [stateList, dispatchList] = useReducer((stateList, action) => {
    switch (action.type) {
      case "ADD_TO_WATCHED":
        return { ...stateList, watched: true };
      case "ADD_TO_PLANNED":
        return { ...stateList, planned: true };
      case "ADD_TO_POSTPONED":
        return { ...stateList, postponed: true };
      default:
        return stateList;
    }
  }, { watched: false, planned: false, postponed: false });
  const dispatch = useDispatch();

  const addButtonHandler = () => {
    setShowDropdown(prevShowDropdown => !prevShowDropdown);
  };

  const dropdownItemHandler = (list) => {
    switch (list) {
      case "watched":
        dispatchList({ type: "ADD_TO_WATCHED" });
        dispatch(addToWatched({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      case "planned":
        dispatchList({ type: "ADD_TO_PLANNED" });
        dispatch(addToPlanned({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      case "postponed":
        dispatchList({ type: "ADD_TO_POSTPONED" });
        dispatch(addToPostponed({id: props.id, title: props.titleName, image: props.image, episodes: props.episodes}));
        break;
      default:
        break;
    }
    // setShowDropdown(false);
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
              Add to list
            </button>
            {showDropdown && (
              <ul className={classes.dropdownMenu}>
                <li onClick={(event) => {
                  dropdownItemHandler("watched");
                  event.preventDefault();
                    }                
                  }>
                  {stateList.watched ? '✓ Watched' : '+ Watched'}
                </li>
                <li onClick={(event) => {
                  event.preventDefault();
                  dropdownItemHandler("planned")}}>
                  {stateList.planned ? '✓ Planned' : '+ Planned'}
                </li>
                <li onClick={(event) => {
                  event.preventDefault();
                  dropdownItemHandler("postponed")}}>
                {stateList.postponed ? '✓ Postponed' : '+ Postponed'}
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
