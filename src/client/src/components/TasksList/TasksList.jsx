import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskButtons from "../TaskButtons/TaskButtons";
import "./taskList.css";

const TasksList = ({
  tasks,
  setTasks,
  setEditTask,
  searchInput,
  statusFilter,
  setPresentedTasksNum,
}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const searchFilteredTasks = tasks.filter((task) => {
      return task.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });

    let statusFilteredTasks = [];

    switch (statusFilter) {
      case "completed":
        statusFilteredTasks = searchFilteredTasks.filter(
          (task) => task.status === true
        );
        break;
      case "uncompleted":
        statusFilteredTasks = searchFilteredTasks.filter(
          (task) => task.status === false
        );
        break;
      default:
        statusFilteredTasks = searchFilteredTasks;
        break;
    }

    setFilteredTasks(statusFilteredTasks);
    setPresentedTasksNum(statusFilteredTasks.length);
  }, [tasks, searchInput, statusFilter]);

  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t.itemName !== task.itemName));
  };

  const handleComplete = (task) => {
    setTasks(
      tasks.map((t) => {
        if (t.itemName === task.itemName) {
          t.status = !t.status;
        }
        return t;
      })
    );
  };

  return (
    <div>
      {filteredTasks.map((task, index) => (
        <li className="list-item" key={index}>
          <div className="grip-lines">
            <i className="fa-solid fa-grip-lines" />
          </div>
          <input
            type="text"
            value={task.itemName}
            className={task.status ? "task-item completed" : "task-item"}
            onChange={(e) => e.preventDefault()}
          />
          <TaskButtons
            handleComplete={() => handleComplete(task)}
            handleDelete={() => handleDelete(task)}
            handleEdit={() => setEditTask(task)}
          />
        </li>
      ))}
    </div>
  );
};

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TasksList;
