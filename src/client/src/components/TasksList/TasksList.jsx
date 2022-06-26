import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskButtons from "../TaskButtons/TaskButtons";
import ItemClient from "../../services/taskService";
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
  const taskService = new ItemClient();

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

  const handleDelete = async (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    await taskService.removeTask(task.id);
  };

  const handleComplete = async (task) => {
    const taskToUpdate = tasks.find((t) => t.id === task.id);
    taskToUpdate.status = !taskToUpdate.status;
    const isToggled = await taskService.updateTask(taskToUpdate);
    if (isToggled) {
      setTasks([...tasks]);
    }
  };

  return (
    <div>
      {filteredTasks.map((task, index) => (
        // for some reason putting key={task.id} is not warking
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
  setEditTask: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  setPresentedTasksNum: PropTypes.func.isRequired,
};

export default TasksList;
