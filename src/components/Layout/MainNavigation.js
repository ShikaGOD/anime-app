import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Button from "./Button";

function MainNavigation() {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to="/">
          <h1>AnimeList</h1>
        </Link>
        <div>
          <Button>Log in</Button>
          <Button>Sign in</Button>
        </div>
      </header>
    </Fragment>
  );
}

export default MainNavigation;
