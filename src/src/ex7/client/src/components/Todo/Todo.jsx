import TodoList from "../TodoList/TodoList.jsx";
import "./Todo.css";
import PropTypes from "prop-types";
const Todo = ({ items, deleteItemFromDb, updateStatusDb, editTaskNameDb }) => {
  return (
    <div className="">
      <ul className="todos">
        {items.map((item, index) => {
          return (
            <TodoList
              item={item}
              deleteItemFromDb={deleteItemFromDb}
              updateStatusDb={updateStatusDb}
              key={item.itemId}
              editTaskNameDb={editTaskNameDb}
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
