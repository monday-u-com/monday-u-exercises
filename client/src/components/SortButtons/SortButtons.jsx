import sortButtonsCSS from "./SortButtons.module.css";
import classNames from "classnames";
import Button from "../Button";
import { useCallback } from "react";
import PropTypes from "prop-types";

function SortButtons({ tasks, sortTasksAction }) {
   const sortButtonHandler = useCallback(async (direction) => {
      try {
         await sortTasksAction(direction);
      } catch (error) {
         console.error(error);
      }
   }, []);

   return (
      <div
         className={classNames({
            [sortButtonsCSS.container]: true,
            [sortButtonsCSS["sort-btns-container"]]: true,
            [sortButtonsCSS.visible]: tasks.length >= 1,
         })}
      >
         <Button
            onClick={() => sortButtonHandler("down")}
            innerText={
               <i
                  className={`${sortButtonsCSS["fa-arrow-down-a-z"]} fa-arrow-down-a-z fa-solid`}
               ></i>
            }
            className={sortButtonsCSS["name-sort-down"]}
         />
         <Button
            onClick={() => sortButtonHandler("up")}
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
   sortTasksAction: PropTypes.func,
};

export default SortButtons;
