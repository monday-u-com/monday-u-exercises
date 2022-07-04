import { useState } from "react";
import "./TodoList.css";
import PropTypes from "prop-types";
const TodoList = ({
  item,
  deleteItemFromDb,
  updateStatusDb,
  editTaskNameDb,
}) => {
  const isPokemon = item.isPokemon === 0 ? false : true;
  const [taskName, setTaskName] = useState(isPokemon ? `Cool You cought ${item.item}` :item.item );
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = async (e) => {
    try {
      if (e.target.checked) {
        await updateStatusDb(item.itemId, true);
      } else {
        await updateStatusDb(item.itemId, false);
      }
    } catch (err) {
      throw new Error("failed to update status with checkbox");
    }
  };

  const handleEditButtonClick = () => {
    setEditClicked(false);
  };
  const handleSaveButtonClick = async () => {
    try {
      setEditClicked(true);
      const newTaskName = taskName.replace("Cool You cought ", "");
      await editTaskNameDb(item.itemId, newTaskName);
    } catch (err) {
      throw new Error("failed to edit task in db");
    }
  };
  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div>
      <li id={item.itemId} className="new-item">
        <div className="items">
          <input
            type="checkbox"
            defaultChecked={item.status}
            onChange={handleCheckboxChange}
          />
          <input
            className="inputText"
            type="text"
            readOnly={isEditClicked}
            value={taskName}
            onChange={handleInputChange}
          />
          {isPokemon && (
            <a href="Pokemon">
              <img src={item.imageUrl} alt="Pokemon"/>
            </a>
          )}
        </div>
        <div>
          
            <button
              className="deleteButton"
              onClick={() => {
                deleteItemFromDb(item.itemId);
              }}
              fontSize="inherit"
            >🗑️</button>
      
          {isEditClicked && (
            <button onClick={handleEditButtonClick} className="editButton" >✏️</button>
          )}
          {!isEditClicked && (
            <button onClick={handleSaveButtonClick} className="saveIcon">💾</button>
          )}
        </div>
      </li>
    </div>
  );
};

TodoList.prototype = {
  item: PropTypes.object,
  deleteItemFromDb: PropTypes.func,
  updateStatusDb: PropTypes.func,
  editTaskNameDb: PropTypes.func,
};
export default TodoList;
