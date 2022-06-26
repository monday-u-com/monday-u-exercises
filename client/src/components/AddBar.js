import "../App.css";

function AddBar() {
   return (
      <div className="container">
         <input type="text" id="task-text" name="task-text" placeholder="Add your new to-do" />
         <button className="add-task">
            <i className="fa-solid fa-plus"></i>
         </button>
      </div>
   );
}

export default AddBar;
