import homeCardCSS from "./HomeCard.module.css";
import AddBarConnector from "../AddBar/AddBarConnector";
import TaskListConnector from "../TaskList/TaskListConnector";
import LoaderConnector from "../Loader/LoaderConnector";
import PendingTasksConnector from "../PendingTasks/PendingTasksConnector";
import SortButtonsConnector from "../SortButtons/SortButtonsConnector";
import SearchConnector from "../Search/SearchConnector";
import DropdownFilterConnector from "../DropdownFilter/DropdownFilterConnector";
import Button from "../Button";
import Titles from "../Titles";
import { useCallback } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../../clients/toast-options";

function HomeCard({ tasks, clearTasksAction }) {
   const clearButtonHandler = useCallback(async () => {
      try {
         await clearTasksAction();
         toast.error("All tasks cleared.", toastOptions);
      } catch (error) {
         console.error(error);
      }
   }, [clearTasksAction]);

   return (
      <div className={homeCardCSS.card}>
         <ToastContainer
            position="top-center"
            className={homeCardCSS.toast}
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
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
            <DropdownFilterConnector />
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
   tasks: PropTypes.array,
   clearTasksAction: PropTypes.func,
};

export default HomeCard;
