import React from "react";

const SearchBar = ({ searchInput, setSearchInput }) => {
  return (
    <div className="search">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>
      <input
        className="input search-input"
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
