import { useState } from "react";
import "./TodoList.css";
import { Checkbox } from "monday-ui-react-core";
import PropTypes from "prop-types";
const TodoList = ({
  item,
  deleteItemAction,
  editItemNameAction,
  updateCheckBoxAction,
}) => {
  const [taskName, setTaskName] = useState(item.item);
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = async (e) => {
    try {
      await updateCheckBoxAction(item.itemId, e.target.checked);
    } catch (err) {
      throw new Error("Error While Update checkbox");
    }
  };

  const handleClickDelete = async () =>{
    await deleteItemAction(item.itemId)
  }

  const handleEditButtonClick = () => {
    setEditClicked(false);
  };

  const handleSaveButtonClick = async () => {
    try {
      setEditClicked(true);
      const newTaskName = taskName.replace("Cool You cought ", "");
      await editItemNameAction(item.itemId, newTaskName);
    } catch (err) {
      throw new Error("Error while edit Todo on DB");
    }
  };
  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  return (
    <div>
      <li id={item.itemId} className="new-item">
        <div className="items">
        <Checkbox
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
          {item.isPokemon!==0 && (
            <a>
              <img src={item.imageUrl} alt="pokemonImg"/>
            </a>
          )}
        </div>
        <div>
          
            <button
              className="deleteButton"
              onClick={handleClickDelete}
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
  deleteItemAction: PropTypes.func,
  editItemNameAction: PropTypes.func,
  updateCheckBoxAction: PropTypes.func,
};
export default TodoList;
