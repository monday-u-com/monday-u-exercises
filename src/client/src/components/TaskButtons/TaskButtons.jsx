import React from "react";
import PropTypes from "prop-types";
import "./taskButtons.css";

const TaskButtons = ({ handleComplete, handleDelete, handleEdit }) => {
  return (
    <div className="task-btns">
      <button className="button-complete task-button" onClick={handleComplete}>
        <i className="fa fa-check-circle"></i>
      </button>
      <button className="button-edit task-button" onClick={handleEdit}>
        <i className="fa fa-edit"></i>
      </button>
      <button className="button-delete task-button" onClick={handleDelete}>
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

TaskButtons.propTypes = {
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TaskButtons;
