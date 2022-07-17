import { useState } from "react";
import "./ListItem.css";
import { Checkbox } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import PropTypes from "prop-types";
const ListItem = ({
  item,
  deleteItemAction,
  editItemNameAction,
  updateCheckBoxAction,
}) => {
  const [taskName, setTaskName] = useState(item.itemName);
  const [isEditClicked, setEditClicked] = useState(true);

  const handleCheckboxChange = async (e) => {
    try {
      await updateCheckBoxAction(item.itemId, e.target.checked);
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
      const newTaskName = taskName.replace("catch", "");
      await editItemNameAction(item.itemId, newTaskName);
    } catch (err) {
      throw new Error("failed to edit task in db");
    }
  };
  const handleInputChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDeleteClick = async () => {
    await deleteItemAction(item.itemId);
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
            data-testid={`item-${item.itemId}`}
            className="inputText"
            type="text"
            readOnly={isEditClicked}
            value={taskName}
            onChange={handleInputChange}
          />
          {item.isPokemon!==0 && (
            <a>
              <img src={item.imageUrl} />
            </a>
          )}
        </div>
        <div>
          
          <button
            className="deleteButton"
            onClick={handleDeleteClick}
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

ListItem.prototype = {
  item: PropTypes.object,
  deleteItemAction: PropTypes.func,
  editItemNameAction: PropTypes.func,
  updateCheckBoxAction: PropTypes.func,
};
export default ListItem;
