import React, { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.jsx";
import TasksList from "../../components/TasksList/TasksList.jsx";
import EmptyListNote from "../../components/EmptyListNote/EmptyListNote.jsx";
import ActionBar from "../../components/ActionBar/ActionBar.jsx";
import RemoveAllBtn from "../../components/RemoveAllButton/RemoveAllBtn.jsx";
import { Toast } from "monday-ui-react-core";
import "./tasks.css";

const Tasks = ({ tasks, setTasks, taskService }) => {
  const [editTask, setEditTask] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [presentedTasksNum, setPresentedTasksNum] = useState(0);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => {
    setIsErrorShown(false);
  };

  const handleRemoveAll = () => {
    setTasks([]);
    taskService.removeAllTasks();
  };

  const showRemoveAllBtn = () => {
    if (presentedTasksNum === tasks.length && tasks.length > 0) {
      return <RemoveAllBtn handleRemoveAll={handleRemoveAll} />;
    } else return null;
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        {isErrorShown && (
          <Toast
            className="monday-storybook-toast_wrapper"
            open
            onClose={handleCloseError}
            type={Toast.types.NEGATIVE}
            autoHideDuration={5000}
          >
            {errorMessage}
          </Toast>
        )}

        <div>
          <Header headline="Tasks List" />
        </div>

        <ActionBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          filter={statusFilter}
          setFilter={setStatusFilter}
        ></ActionBar>
        <div>
          <AddTaskForm
            tasks={tasks}
            setTasks={setTasks}
            editTask={editTask}
            setEditTask={setEditTask}
            setErrorMessage={setErrorMessage}
            setIsErrorShown={setIsErrorShown}
          />
        </div>
        {/* if taskslist empty show empty message */}
        {tasks.length === 0 ? (
          <EmptyListNote />
        ) : (
          <div>
            <TasksList
              tasks={tasks}
              statusFilter={statusFilter}
              searchInput={searchInput}
              setTasks={setTasks}
              setEditTask={setEditTask}
              setPresentedTasksNum={setPresentedTasksNum}
            />
          </div>
        )}
        <div>{showRemoveAllBtn()}</div>
      </div>
    </div>
  );
};

export default Tasks;
