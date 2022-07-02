import React, { useCallback, useEffect, useState, useRef } from "react";
import { Icon, Button } from "monday-ui-react-core";
import { getAllTasks, addTask, removeAllTasks } from "../../api/item_client";
import { Add, Delete } from "monday-ui-react-core/dist/allIcons";
import styles from "./TodoMainPage.module.scss";
import TasksContainer from "../TasksContainer/TasksContainer";
import Loading from "../Loading/Loading";

const TodoMainPage = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const inputRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const hasTasks = todoList.length !== 0;

  useEffect(() => {
    console.log("useEff");
    getAllTasks().then((results) => {
      setTodoList(results);
      setIsLoading(false);
    });
  }, [isLoading]);

  const onInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onAddClick = useCallback(() => {
    if (!isValidInput(input)) return;
    addTask(input).then(() => {
      setInput("");
      setIsLoading(true);
    });
  }, [input]);

  const isValidInput = (text) => {
    if (text.trim() === "") {
      alert("Error: Task is not valid!");
      inputRef.current.focus();
      return false;
    }
    return true;
  };

  const onClearAll = useCallback(() => {
    removeAllTasks().then(() => {
      setIsLoading(true);
    });
  }, []);

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
            iconSize="24"
            ignoreFocusStyle
          />
        </div>
        {isLoading && <Loading/>}
        {hasTasks && (
          <TasksContainer todoList={todoList} setIsLoading={setIsLoading} />
        )}
      </div>
      <div className={styles.bottom_app}>
        <p className={styles.footer}>
          {hasTasks
            ? `You have ${todoList.length} tasks`
            : "WooHoo!! You have no tasks pending!"}
        </p>
        <Button
          onClick={onClearAll}
          rightIcon={Delete}
          style={{
            backgroundColor: "#fdcd3b",
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TodoMainPage;
