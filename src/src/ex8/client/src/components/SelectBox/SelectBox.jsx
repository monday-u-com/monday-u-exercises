import React from "react";
import "./SelectBox.css"
import PropTypes from "prop-types";
const SelectBox = ({ updateSelectInputAction }) => {
  const handleSelcetClick = (e) => {
    if (e.target.value === "All") updateSelectInputAction(true);
    else updateSelectInputAction(false);
  };
  return (
    
    <select  name="todos" id="todos" onChange={handleSelcetClick}>
      <option defaultValue value="All">
        All Todos
      </option>
      <option value="Done">Completed</option>
    </select>
    
  );
};

export default SelectBox;

SelectBox.prototype = {
  updateSelectInputAction: PropTypes.func,
};
