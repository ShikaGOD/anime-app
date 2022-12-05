import classes from "./Title.module.css";
import Card from "../../../UI/Card";


function Title(props) {
  return (
    <Card>
      <li>
        <figure className={classes.figure}>
          <img src={props.img} alt="naruto"/>
          <figcaption className={classes.title}>{props.titleName}</figcaption>
        </figure>
      </li>
    </Card>
  );
}

export default Title;
