import sortButtonsCSS from "./SortButtons.module.css";
import Button from "../Button";
import { useCallback } from "react";
import PropTypes from "prop-types";

function SortButtons({ sortTasksAction }) {
   const sortButtonHandler = useCallback(
      async (direction) => {
         try {
            await sortTasksAction(direction);
         } catch (error) {
            console.error(error);
         }
      },
      [sortTasksAction]
   );

   return (
      <>
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
      </>
   );
}

SortButtons.propTypes = {
   sortTasksAction: PropTypes.func,
};

export default SortButtons;
