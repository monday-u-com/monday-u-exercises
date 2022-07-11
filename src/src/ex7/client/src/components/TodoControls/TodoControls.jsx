import { useState } from "react";
import "./TodoControls.css";
import PropTypes from "prop-types";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";


const TodoControls = ({ showLoaderAction, hideLoaderAction, addItemsAction, showLoader }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleEnterPress = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        showLoaderAction();

        await addItemsAction(inputValue);
        hideLoaderAction();
        setInputValue("");
      }
    } catch (err) {
      throw new Error("Error while Enter Key Pressed");
    }
  };
  const handlePressClick = async () => {
    try {
      showLoaderAction();
      await addItemsAction(inputValue);
      hideLoaderAction();
      setInputValue("");
    } catch (err) {
      throw new Error("Error render :  while Key Pressed");
    }
  };

  return (
    <div>
      <div className="list-controls">
        <input
          type="text"
          className="taskInput"
          placeholder="Enetr New Todo..."
          onKeyPress={handleEnterPress}
          onChange={handleInputValue}
          value={inputValue}
        />
        <Button
          id="add-button"
          type="button"
          onClick={handlePressClick}
          loading={showLoader}
        >
          🔥
        </Button>
      </div>
    </div>
  );
};

TodoControls.propTypes = {
  showLoaderAction:PropTypes.func,
  hideLoaderAction:PropTypes.func,
  addItemsAction:PropTypes.func,
  showLoader:PropTypes.bool
};

export default TodoControls;
