import sortButtonsCSS from "./SortButtons.module.css";
import Button from "./Button";
import { useCallback } from "react";
import api from "../clients/item-client.js";
import PropTypes from "prop-types";

function SortButtons({ tasks, setTasks }) {
   const sortButtonHandler = useCallback(
      async (direction) => {
         const sortedTasks = await api.sortTasks(direction);
         setTasks(sortedTasks);
      },
      [setTasks]
   );

   return (
      <div
         className={`${sortButtonsCSS.container} ${sortButtonsCSS["sort-btns-container"]} ${
            tasks.length >= 1 ? sortButtonsCSS.visible : ""
         }`}
      >
         <Button
            buttonHandler={() => sortButtonHandler("down")}
            innerText={
               <i
                  className={`${sortButtonsCSS["fa-arrow-down-a-z"]} fa-arrow-down-a-z fa-solid`}
               ></i>
            }
            className={sortButtonsCSS["name-sort-down"]}
         />
         <Button
            buttonHandler={() => sortButtonHandler("up")}
            innerText={
               <i className={`${sortButtonsCSS["fa-arrow-up-a-z"]} fa-arrow-up-a-z fa-solid`}></i>
            }
            className={sortButtonsCSS["name-sort-up"]}
         />
      </div>
   );
}

SortButtons.propTypes = {
   tasks: PropTypes.array,
   setTasks: PropTypes.func,
};

export default SortButtons;
