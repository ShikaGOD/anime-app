import classes from "./Title.module.css";

function Title(props) {
  return (
    <li>
      <figure className={classes.figure}>
        <img src={props.img} alt="naruto" />
        <figcaption>{props.titleName}</figcaption>
      </figure>
    </li>
  );
}

export default Title;
