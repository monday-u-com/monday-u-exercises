import styles from "./App.module.scss";
import TodoMainPageConnector from "./Components/TodoMainPage/TodoMainPage-connector";

function App() {
  return (
    <div className={styles.App}>
      <TodoMainPageConnector />
    </div>
  );
}

export default App;
