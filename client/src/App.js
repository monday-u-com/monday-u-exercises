import styles from "./App.module.css";
import Main from "./components/todos/Main";
import React from "react";
function App() {
  return (
    <div className={styles.app}>
      <Main />
    </div>
  );
}

export default App;
