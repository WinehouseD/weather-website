import React, { useEffect, useState } from "react";
import "./Search.scss";
import useDebounce from "../../hooks/useDebounce";
import { fetchAutocomplete } from "../../api/services";
import { toast } from "react-toastify";

function Search({ town, setTown, handleSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedSearch = useDebounce(town, 500);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      fetchAutocomplete(debouncedSearch)
        .then((suggestions) => {
          setSuggestions(suggestions);
        })
        .catch(() => {
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setActiveIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      setActiveIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSearch(town);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setTown(suggestion.name);
    setSuggestions([]);
    handleSearch(suggestion.name);
  };

  const hoverText = () =>{
    toast.info('Some cities might not be supported.');
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
          data-toggle="tooltip"
          title="Search"
        />
        <img
          className="search-icon"
          src="icons/search.svg"
          alt="search"
          loading="lazy"
        />
        <img className="info-icon" src="icons/info.svg" alt="info" loading="lazy" data-toggle="tooltip" title="info" onMouseEnter={hoverText}/>
      </div>
      <div className="suggestion-container">
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default Search;