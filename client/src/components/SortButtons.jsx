import "../App.css";

function SortButtons() {
   return (
      <div className="container sort-btns-container">
         <button className="name-sort-down">
            <i className="fa-solid fa-arrow-down-a-z"></i>
         </button>
         <button className="name-sort-up">
            <i className="fa-solid fa-arrow-up-a-z"></i>
         </button>
      </div>
   );
}

export default SortButtons;
