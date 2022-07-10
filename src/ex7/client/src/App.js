import styles from "./App.module.scss";
import TodoMainPage from "./Components/TodoMainPage/TodoMainPage";
import TodoMainPageConnector from "./Components/TodoMainPage/TodoMainPage-connector";

function App() {
  return (
    <div className={styles.App}>
      <TodoMainPageConnector />
    </div>
  );
}

export default App;
