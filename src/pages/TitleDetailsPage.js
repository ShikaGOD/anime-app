import React from "react";
import TitleDetails from "../components/Titles/TitleDetails/TitleDetails";
import { useLoaderData } from "react-router-dom";

function TitleDetailsPage() {
  const animeInfo = useLoaderData();
  return <TitleDetails animeInfo={animeInfo} />;
}

export async function loader({ params }) {
  const { titleId } = params;
  const response = await fetch(`https://api.jikan.moe/v4/anime/${titleId}`);
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }
  const responseData = await response.json();
  return responseData.data;
}

export default TitleDetailsPage;
