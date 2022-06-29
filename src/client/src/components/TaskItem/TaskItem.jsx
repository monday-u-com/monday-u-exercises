import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskButtons from "../TaskButtons/TaskButtons";
import "./taskItem.css";

const TaskItem = ({ task, setEditTask, handleComplete, handleDelete }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="task-item"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="grip-lines">
        <i className="fa-solid fa-grip-lines" />
      </div>
      <div
        className={
          task.status ? "task-item-content completed" : "task-item-content"
        }
      >
        <p>{task.itemName}</p>
      </div>
      {isHovering && (
        <TaskButtons
          key={task.id}
          handleComplete={() => handleComplete(task)}
          handleDelete={() => handleDelete(task)}
          handleEdit={() => setEditTask(task)}
        />
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  setEditTask: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TaskItem;
