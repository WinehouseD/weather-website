import React from "react";
import "./Search.scss";

function Search({ town, setTown, handleSearch }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
        ></img>
      </div>
    </div>
  );
}

export default Search;
