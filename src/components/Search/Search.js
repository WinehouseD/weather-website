import React, { useEffect } from "react";
import "./Search.scss";
import useDebounce from "../../hooks/useDebounce";

function Search({ town, setTown, handleSearch }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const debouncedSearch = useDebounce(town, 500);

  useEffect(() => {
    if (debouncedSearch) {
    }
  }, [debouncedSearch]);

  return (
    <div className="inp-field">
      <div className="input-container">
        <input
          type="text"
          value={town}
          onChange={(event) => setTown(event.target.value)}
          placeholder="Enter location EN/UA"
          onKeyDown={handleKeyDown}
        />
        <img
          className="searchBtn"
          src="icons/search.svg"
          onClick={handleSearch}
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
