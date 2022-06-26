import "../App.css";
import Button from "./Button";

function AddBar() {
   return (
      <div className="container">
         <input type="text" id="task-text" name="task-text" placeholder="Add your new to-do" />
         <Button innerText={<i className="fa-solid fa-plus"></i>} className={"add-task"} />
      </div>
   );
}

export default AddBar;
