import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import classes from "./Home.module.css";

function Home() {
  return (
    <>
      <div className={classes.container}>
        <img
          src="https://images6.alphacoders.com/774/774850.jpg"
          alt="home-background"
          className={classes.background}
        />
      </div>
      <div className={classes.textContainer}>
        <p className={classes.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including versions
          of Lorem Ipsum.
        
          <Link to="/list">
              <button>Go to List</button>
            </Link>
        </p>
      </div>
    </>
  );
}

export default Home;
