import PropTypes from "prop-types";

function Button({ onClick, className, innerText, disabled }) {
   return (
      <button onClick={onClick} className={className} disabled={disabled}>
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
