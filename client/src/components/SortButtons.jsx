import "../App.css";
import Button from "./Button";

function SortButtons({ tasks }) {
   return (
      <div className={`container sort-btns-container ${tasks.length >= 1 ? "visible" : ""}`}>
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
