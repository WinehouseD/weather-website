import React, { useEffect, useState } from "react";
import "./Search.scss";
import useDebounce from "../../hooks/useDebounce";

function Search({ town, setTown, handleSearch }) {
  const [debouncedTown, setDebouncedTown] = useState(town);
  const debouncedSearch = useDebounce(town, 500);

  useEffect(() => {
    setDebouncedTown(debouncedSearch);
  }, [debouncedSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(debouncedTown);
    }
  };

const handleButtonClick = () => {
  handleSearch(debouncedTown)
}

  return (
    <div className="inp-field">
      <div className="input-container">
        <input
          type="text"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter location EN"
          onKeyDown={handleKeyDown}
        />
        <img
          className="searchBtn"
          src="icons/search.svg"
          onClick={handleButtonClick}
          alt="search"
          data-toggle="tooltip"
          title="Search"
          loading="lazy"
        ></img>
      </div>
    </div>
  );
}

export default Search;
