import React from "react";
import SelectSearch from "react-select-search";
import "./SearchBar.css"

function SearchBar() {
  async function getOptions(query) {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();
    //   console.log(data.data);
      const options = data.data.map(({ mal_id, title }) => ({
        value: mal_id,
        name: title,
      }));

      console.log(options);
      return options;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return (
    <SelectSearch
      search
      placeholder="Search Anime"
      options={[]}
      getOptions={(query) => getOptions(query)}
      onChange={(value) => console.log(value)}
    />
  );
}

export default SearchBar;
