import { useRef } from "react";
import Button from "./Button";
import styles from "./UserInput.module.css";
import PropTypes from "prop-types";

const UserInput = ({ onClickAddButtonHandler }) => {
  const userInputRef = useRef();
  const onClickButtun = () => {
    onClickAddButtonHandler(userInputRef);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onClickAddButtonHandler(userInputRef);
    }
  };
  return (
    <div className={styles.listControls}>
      <input
        className={styles.listItemInput}
        type="text"
        placeholder="Add your new todo"
        ref={userInputRef}
        onKeyPress={handleKeypress}
      />

      <Button
        onClickHandler={onClickButtun}
        buttonClass={"addButton"}
        value={"+"}
      />
    </div>
  );
};

UserInput.propTypes = {
  onClickAddButtonHandler: PropTypes.func,
};

UserInput.defaultProps = {
  onClickAddButtonHandler: "none", /// need to check it with ayelet
};

export default UserInput;
