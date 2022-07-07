import { useEffect, useMemo } from "react";
import taskListCSS from "./TaskList.module.css";
import TaskConnector from "../Task/TaskConnector";
import PropTypes from "prop-types";

function TaskList({
   tasksToDisplay,
   loaderShowAction,
   loaderHideAction,
   getAPITasksAction,
   setTasksAction,
}) {
   useEffect(() => {
      (async () => {
         loaderShowAction();
         try {
            const response = await getAPITasksAction();
            const allTasks = response.payload;
            allTasks ? setTasksAction(allTasks) : console.error("Server error");
         } catch (error) {
            console.error(error);
         }
         loaderHideAction();
      })();
   }, [loaderShowAction, loaderHideAction, getAPITasksAction, setTasksAction]);

   const tasksList = useMemo(() => {
      return tasksToDisplay.map((task) => <TaskConnector task={task} key={task.id} />);
   }, [tasksToDisplay]);

   return <ul className={taskListCSS["all-tasks-container"]}>{tasksList}</ul>;
}

TaskList.propTypes = {
   tasksToDisplay: PropTypes.array,
   loaderShowAction: PropTypes.func,
   loaderHideAction: PropTypes.func,
   getAPITasksAction: PropTypes.func,
   setTasksAction: PropTypes.func,
};

export default TaskList;
