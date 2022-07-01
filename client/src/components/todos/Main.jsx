import React from "react";
import TodoApp from "./TodoApp";
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.appBackground}>
      <TodoApp />
    </div>
  );
};

export default Main;
