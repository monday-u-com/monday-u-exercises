import TodoListConnector from "../TodoList/TodoListConnector.js";
import "./Todo.css";
import PropTypes from "prop-types";
const Todo = ({ items, searchInputValue}) => {
  console.log("Hello")
  return (
    
    <div>
      <ul className="tasks">
        
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
