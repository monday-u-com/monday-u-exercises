import "./App.css";
// import TodoListComp from "./components/todoListComp/todoListComp";
import TodoListCompConnector from "./components/todoListComp/TodoListCompConnector";
function App({ showToastAction, showToast }) {
	return <TodoListCompConnector />;
}

export default App;
