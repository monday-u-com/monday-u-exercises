import homeCardCSS from "./HomeCard.module.css";
import AddBarConnector from "./AddBar/AddBarConnector";
import SortButtons from "./SortButtons";
import TaskListConnector from "./TaskList/TaskListConnector";
import LoaderConnector from "./Loader/LoaderConnector";
import PendingTasks from "./PendingTasks";
import Button from "./Button";
import Titles from "./Titles";
import { useState, useCallback } from "react";
import api from "../clients/item-client.js";

function HomeCard() {
   const [tasks, setTasks] = useState([]);

   const clearButtonHandler = useCallback(async () => {
      try {
         await api.clearTasks();
         setTasks([]);
      } catch (error) {
         console.error(error);
      }
   }, []);

   return (
      <div className={homeCardCSS.card}>
         <Titles />
         <AddBarConnector setTasks={setTasks} />
         <SortButtons tasks={tasks} setTasks={setTasks} />
         <div className={homeCardCSS["tasks-and-clear-container"]}>
            <TaskListConnector />
            <LoaderConnector />
            <div className={homeCardCSS["footer-container"]}>
               <PendingTasks tasks={tasks} />
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

export default HomeCard;
