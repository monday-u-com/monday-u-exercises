import styles from "./App.module.css";
import TodoMainPage from "./Components/TodoMainPage/TodoMainPage";

function App() {
  return (
    <div className={styles.App}>
      <TodoMainPage />
    </div>
  );
}

export default App;
