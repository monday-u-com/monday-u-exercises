import PropTypes from "prop-types";
import TodoListConnector from "../TodoList/TodoListConnector.js";
const DoneTodos = ({searchInputValue, doneItems}) =>{

    return (
        <div>
          <ul className="tasks">
            {doneItems
              .filter((item) => item.item.includes(searchInputValue))
              .map((item) => {
                return <TodoListConnector item={item} key={item.itemId} />;
              })}
          </ul>
        </div>
      );
    };
    DoneTodos.prototype = {
      doneItems: PropTypes.array,
      searchInputValue: PropTypes.string,
    };
    
    export default DoneTodos;
