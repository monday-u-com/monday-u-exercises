import PropTypes from "prop-types";

function Button({ buttonHandler, className, innerText }) {
   return (
      <button onClick={buttonHandler} className={className}>
         {innerText}
      </button>
   );
}

Button.propTypes = {
   buttonHandler: PropTypes.func,
   className: PropTypes.string,
   innerText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Button;
