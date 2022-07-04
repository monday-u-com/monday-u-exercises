import { useState } from "react";
import "./TodoControls.css";
import { Button } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import PropTypes from "prop-types";

const TodoControls = ({ renderNewItems }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputValue = (e) => {
    setInputValue(e.target.value.trim());
  };

  const handleEnterPress = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        setLoading(true);

        await renderNewItems(inputValue);
        setLoading(false);
        setInputValue("");
      }
    } catch (err) {
      throw new Error("failed to render with enter press");
    }
  };
  const handlePressClick = async () => {
    try {
      setLoading(true);
      await renderNewItems(inputValue);
      setLoading(false);
      setInputValue("");
    } catch (err) {
      throw new Error("failed to render items with button clicked");
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
          loading={loading}
        >
          🔥
        </Button>
      </div>
    </div>
  );
};

TodoControls.propTypes = {
  renderNewItems: PropTypes.func,
};

export default TodoControls;
