import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./addTaskForm.css";

const AddTaskForm = ({ tasks, setTasks, editTask, setEditTask }) => {
  const [input, setInput] = useState("");

  let iconClassName;

  useEffect(() => {
    if (editTask) {
      setInput(editTask.itemName);
    } else {
      setInput("");
    }
  }, [editTask, setInput]);

  const setButtonIcon = () => {
    if (editTask) {
      iconClassName = "fa fa-pencil-alt";
    } else {
      iconClassName = "fa fa-plus";
    }
  };
  const updateTask = (input, itemName, status) => {
    const newTask = {
      itemName: input,
      status: status,
    };
    setTasks(
      tasks.map((task) => {
        if (task.itemName === itemName) {
          return newTask;
        }
        return task;
      })
    );
    setEditTask(null);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      updateTask(input, editTask.itemName, editTask.status);
    } else {
      if (input.trim()) {
        setTasks([...tasks, { itemName: input, status: false }]);
        setInput("");
      }
    }
  };

  return (
    <form className="add-task-action" onSubmit={onFormSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter new Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="button-add">
        {setButtonIcon()}
        <i className={iconClassName}></i>
      </button>
    </form>
  );
};

AddTaskForm.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  editTask: PropTypes.object,
  setEditTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
