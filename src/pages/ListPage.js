import React from "react";
import AnimeList from "../components/Titles/Catalog/AnimeList";
import Paginate from "../components/Titles/Paginate/Paginate";

function ListPage() {
  return (
    <>
      <AnimeList />
      <Paginate />
    </>
  );
}

export default ListPage;
