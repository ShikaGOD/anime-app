import classes from "./Title.module.css";

function Title(props) {
  return (
      <li className={classes.title__container}>    
          <div className={classes.title__card}>
            <img src={props.image} alt={props.titleName}/>
          </div>
          <div>
            <p>{props.titleName}</p>
          </div>
      </li>
  );
}

export default Title;
