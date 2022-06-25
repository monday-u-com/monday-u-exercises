import React from "react";
import "./actionBar.css";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";

const ActionBar = ({ searchInput, setSearchInput, filter, setFilter }) => {
  return (
    <div className="actions">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <StatusFilter filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default ActionBar;
