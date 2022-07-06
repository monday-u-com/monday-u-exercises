import homeCardCSS from "./HomeCard.module.css";
import AddBarConnector from "../AddBar/AddBarConnector";
import SortButtons from "../SortButtons";
import TaskListConnector from "../TaskList/TaskListConnector";
import LoaderConnector from "../Loader/LoaderConnector";
import Button from "../Button";
import Titles from "../Titles";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import PendingTasksConnector from "../PendingTasks/PendingTasksConnector";

function HomeCard({ clearTasksAction }) {
   const [tasks, setTasks] = useState([]);

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
         <SortButtons tasks={tasks} setTasks={setTasks} />
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
