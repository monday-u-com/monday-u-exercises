import sortButtonsCSS from "./SortButtons.module.css";
import classNames from "classnames";
import Button from "./Button";
import { useCallback } from "react";
import api from "../clients/item-client.js";
import PropTypes from "prop-types";

function SortButtons({ tasks, setTasks }) {
   const sortButtonHandler = useCallback(
      async (direction) => {
         try {
            const sortedTasks = await api.sortTasks(direction);
            sortedTasks ? setTasks(sortedTasks) : console.error("Server error");
         } catch (error) {
            console.error(error);
         }
      },
      [setTasks]
   );

   return (
      <div
         className={classNames({
            [sortButtonsCSS.container]: true,
            [sortButtonsCSS["sort-btns-container"]]: true,
            [sortButtonsCSS.visible]: tasks.length >= 1,
         })}
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
