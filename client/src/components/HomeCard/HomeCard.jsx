import homeCardCSS from "./HomeCard.module.css";
import AddBarConnector from "../AddBar/AddBarConnector";
import TaskListConnector from "../TaskList/TaskListConnector";
import LoaderConnector from "../Loader/LoaderConnector";
import PendingTasksConnector from "../PendingTasks/PendingTasksConnector";
import SortButtonsConnector from "../SortButtons/SortButtonsConnector";
import SearchConnector from "../Search/SearchConnector";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import Button from "../Button";
import Titles from "../Titles";
import { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

function HomeCard({ tasks, clearTasksAction }) {
   const clearButtonHandler = useCallback(async () => {
      try {
         await clearTasksAction();
      } catch (error) {
         console.error(error);
      }
   }, [clearTasksAction]);

   return (
      <div className={homeCardCSS.card}>
         <Titles />
         <AddBarConnector />
         <div
            className={classNames({
               [homeCardCSS.container]: true,
               [homeCardCSS["sort-btns-container"]]: true,
               [homeCardCSS.visible]: tasks.length >= 1,
            })}
         >
            <SortButtonsConnector />
            <SearchConnector />
            <DropdownFilter />
         </div>
         <div className={homeCardCSS["tasks-and-clear-container"]}>
            <TaskListConnector />
            <LoaderConnector />
            <div className={homeCardCSS["footer-container"]}>
               <PendingTasksConnector />
               <Button
                  onClick={clearButtonHandler}
                  innerText={"Clear All"}
                  className={homeCardCSS["clear-all"]}
               />
            </div>
         </div>
      </div>
   );
}

HomeCard.propTypes = {
   clearTasksAction: PropTypes.func,
};

export default HomeCard;
