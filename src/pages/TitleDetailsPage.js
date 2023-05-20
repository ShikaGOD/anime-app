import React from "react";
import TitleDetails from "../components/Titles/TitleDetails/TitleDetails";
import { useLoaderData } from "react-router-dom";

function TitleDetailsPage() {
  const animeInfo = useLoaderData();
  return <TitleDetails animeInfo={animeInfo} />;
}

export default TitleDetailsPage;
