import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import TypewriterComponent from "typewriter-effect";

function Home() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <div className={classes.homeContainer}>
        <img
          src="https://images6.alphacoders.com/774/774850.jpg"
          alt="home-background"
          className={classes.background}
        />
      </div>
      <article className={classes.textContainer}>
        <div className={classes.text}>
          <TypewriterComponent
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "Hello, dear friend! Welcome to AnimeList. Here you can read information about hundreds of anime and watch their trailers. Additionally, you can add anime to your list, rate them, and keep track of watched episodes. Enjoy!"
                )
                .callFunction(() => {
                  console.log("String typed out!");
                  setShowButton(true);
                })
                .start();
            }}
            options={{
              typeSpeed: 200, 
              autoStart: true,
            }}
          />
          <div className={classes.buttonContainer} style={{ opacity: showButton ? 1 : 0 }}>
            <button onClick={() => navigate("/catalog")}>Get started!</button>
          </div>
        </div>
      </article>
    </>
  );
}

export default Home;
