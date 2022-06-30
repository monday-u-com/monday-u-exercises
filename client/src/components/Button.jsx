function Button({ buttonHandler, className, innerText }) {
   return (
      <button onClick={buttonHandler} className={className}>
         {innerText}
      </button>
   );
}

export default Button;
