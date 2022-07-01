import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClickHandler, buttonClass, value }) => {
  return (
    <button className={styles[buttonClass]} onClick={() => onClickHandler()}>
      {value}
    </button>
  );
};

Button.propTypes = {
  buttonClass: PropTypes.string,
  value: PropTypes.string,
  onClickHandler: PropTypes.func,
};

Button.defaultProps = {
  buttonClass: "",
  value: "Button",
  onClickHandler: "none", /// need to check it with ayelet
};
export default Button;
