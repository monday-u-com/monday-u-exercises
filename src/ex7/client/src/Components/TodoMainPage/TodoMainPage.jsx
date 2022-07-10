import React, { useCallback, useEffect, useState, useRef } from "react";
import { Icon, Button, Search, Checkbox } from "monday-ui-react-core";
import { Add, Delete, Undo } from "monday-ui-react-core/dist/allIcons";
import styles from "./TodoMainPage.module.scss";
import TasksContainerConnector from "../TasksContainer/TasksContainer-connector";
import Loading from "../Loading/Loading";

const TodoMainPage = ({
  todoList,
  addTaskAction,
  marked,
  removedTasks,
  getAllTasksAction,
  deleteAllAction,
  setSearchInputAction,
  setMarkedAction,
  restoreTaskAction,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  const hasTasks = todoList?.length !== 0;
  const hasRemovedTask = removedTasks.length !== 0;

  useEffect(() => {
    getAllTasksAction();
    setIsLoading(false);
  }, []);

  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onAddClick = useCallback(() => {
    setIsLoading(true);
    if (!isValidInput(input)) {
      setIsLoading(false);
      return;
    }
    addTaskAction(input);
    setInput("");
    setIsLoading(false);
  }, [addTaskAction, input]);

  const isValidInput = (text) => {
    if (text.trim() === "") {
      alert("Error: Task is not valid!");
      setInput("");
      inputRef.current.focus();
      return false;
    }
    return true;
  };

  const onClearAll = useCallback(() => {
    setIsLoading(true);
    deleteAllAction();
    setIsLoading(false);
  }, []);

  const onSearchChange = useCallback((value) => {
    setSearchInputAction(value);
  }, []);

  const onOnlyMarkedChange = (e) => {
    setMarkedAction({ marked: e.target.checked });
  };

  const onOnlyUnmarkedChange = (e) => {
    setMarkedAction({ unmarked: e.target.checked });
  };
  const onRestore = () => {
    if (hasRemovedTask)
      restoreTaskAction(removedTasks[removedTasks.length - 1]);
    else{
      alert("No tasks to restore!");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.top_app}>
        <h1 className={styles.app_title}>To-Do App</h1>
        <div className={styles.add_task_div}>
          <input
            type="text"
            value={input}
            placeholder="Add your new todo"
            className={styles.add_task_field}
            onChange={onInputChange}
            ref={inputRef}
          />
          <Icon
            icon={Add}
            onClick={onAddClick}
            className={styles.add_task_btn}
            iconSize={24}
            ignoreFocusStyle
          />
          <Icon
            icon={Undo}
            onClick={onRestore}
            iconLabel="restore"
            iconSize={24}
            ignoreFocusStyle
            clickable={hasRemovedTask}
          />
        </div>
        <div className={styles.filters_task_div}>
          <Search
            className={styles.search_tasks}
            placeholder="search"
            size={Search.sizes.SMALL}
            onChange={onSearchChange}
          />
          <Checkbox
            className={styles.search_tasks_marked}
            ariaLabel=""
            checked={marked.marked}
            label="Only marked"
            onChange={onOnlyMarkedChange}
          />
          <Checkbox
            className={styles.search_tasks_unmarked}
            ariaLabel=""
            checked={marked.unmarked}
            label="Only unmarked"
            onChange={onOnlyUnmarkedChange}
          />
        </div>
        {isLoading && <Loading />}
        {hasTasks && <TasksContainerConnector />}
      </div>
      <div className={styles.bottom_app}>
        <p className={styles.footer}>
          {hasTasks
            ? `You have ${todoList.length} tasks`
            : "WooHoo!! You have no tasks pending!"}
        </p>
        <Button
          onClick={onClearAll}
          className ={styles.delete_all_button}
          color = {null}
          rightIcon={Delete}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TodoMainPage;
