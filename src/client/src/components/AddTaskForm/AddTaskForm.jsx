import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemClient from "../../services/taskService";

import "./addTaskForm.css";

const AddTaskForm = ({ tasks, setTasks, editTask, setEditTask }) => {
  const [input, setInput] = useState("");

  const taskService = new ItemClient();
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

  const updateTask = async (input, id, itemName, status) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    taskToEdit.itemName = input;
    taskToEdit.status = status;
    const isEdited = await taskService.updateTask(taskToEdit);
    if (isEdited) {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return taskToEdit;
          }
          return task;
        })
      );
      setEditTask(null);
    } else {
      alert("Error updating task");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (editTask) {
      updateTask(input, editTask.id, editTask.itemName, editTask.status);
    } else {
      if (input.trim()) {
        const position = tasks.length;
        const res = await taskService.addTask(input, false, position);
        if (res) {
          if (Array.isArray(res)) {
            setTasks([...tasks, ...res]);
          } else {
            setTasks([...tasks, res]);
          }
          setInput("");
        } else {
          alert("Error adding task");
        }
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
