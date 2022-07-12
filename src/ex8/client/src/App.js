import TodoAppContainerConnector from "./components/todo-app-container/TodoAppContainerConnector";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <TodoAppContainerConnector />
    </div>
  );
}

export default App;
