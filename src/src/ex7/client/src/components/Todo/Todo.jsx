import TodoListConnector from "../TodoList/TodoListConnector.jsx";
import "./Todo.css";
import PropTypes from "prop-types";
const Todo = ({ items}) => {
  return (
    <div className="">
      <ul className="todos">
        {items.map((item, index) => {
          return (
            <TodoListConnector
              item={item}
              key={item.itemId}
             
            />
          );
        })}
      </ul>
    </div>
  );
};
Todo.prototype = {
  items: PropTypes.array,
  deleteItemFromDb: PropTypes.func,
  updateStatusDb: PropTypes.func,
  editTaskNameDb: PropTypes.func,
};

export default Todo;
