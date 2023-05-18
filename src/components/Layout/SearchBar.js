import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimeSearchResults } from "../../store/searchSlice";
import SelectSearch from "react-select-search";
import "./SearchBar.css";
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const searchResults = useSelector(state => state.search.searchResults);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(null);

  async function getOptions(query) {
    try {
      const options = await dispatch(fetchAnimeSearchResults(query));
      return options;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function handleChange(value) {
    setSelectedValue(value);
    navigate(`/catalog/${value}`);
    console.log(value);
  }

  return (
    <SelectSearch
      search
      placeholder="Search Anime"
      options={searchResults}
      getOptions={(query) => getOptions(query)}
      onChange={handleChange}
      value={selectedValue}
    />
  );
}

export default SearchBar;
