import TodoListConnector from "../TodoList/TodoListConnector";
import "./Todo.css";
import PropTypes from "prop-types";
const Todo = ({ items, searchInputValue}) => {
  return (
    <div>
      <ul className="todos">
        
        {items
          .filter((item) => item.item.includes(searchInputValue))
          .map((item) => {
            return <TodoListConnector item={item} key={item.itemId} />;
          })}
      </ul>
    </div>
  );
};
Todo.prototype = {
  items: PropTypes.array,
  searchInputValue: PropTypes.string,
};

export default Todo;
