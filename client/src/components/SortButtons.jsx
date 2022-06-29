import "../App.css";
import Button from "./Button";
import { useCallback } from "react";
import api from "../clients/item-client.js";

function SortButtons({ tasks, setTasks }) {
   const sortButtonHandler = useCallback(
      async (direction) => {
         const sortedTasks = await api.sortTasks(direction);
         setTasks(sortedTasks);
      },
      [setTasks]
   );

   return (
      <div className={`container sort-btns-container ${tasks.length >= 1 ? "visible" : ""}`}>
         <Button
            buttonHandler={() => sortButtonHandler("down")}
            innerText={<i className="fa-solid fa-arrow-down-a-z"></i>}
            className={"name-sort-down"}
         />
         <Button
            buttonHandler={() => sortButtonHandler("up")}
            innerText={<i className="fa-solid fa-arrow-up-a-z"></i>}
            className={"name-sort-up"}
         />
      </div>
   );
}

export default SortButtons;
