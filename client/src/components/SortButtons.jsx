import "../App.css";
import Button from "./Button";

function SortButtons() {
   return (
      <div className="container sort-btns-container">
         <Button
            innerText={<i className="fa-solid fa-arrow-down-a-z"></i>}
            className={"name-sort-down"}
         />
         <Button
            innerText={<i className="fa-solid fa-arrow-up-a-z"></i>}
            className={"name-sort-up"}
         />
      </div>
   );
}

export default SortButtons;
