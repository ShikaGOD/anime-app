import "./App.css";
import { Fragment } from "react";
// import {Routes, Route} from 'react-router-dom'
import MainNavigation from "./components/Layout/MainNavigation";
import Titles from "./components/Titles/Titles";

function App() {
  return (
    <Fragment>
      <MainNavigation></MainNavigation>
      <Titles />
    </Fragment>
  );
}

export default App;
