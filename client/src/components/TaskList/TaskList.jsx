import { useEffect, useMemo } from "react";
import taskListCSS from "./TaskList.module.css";
import TaskConnector from "../Task/TaskConnector";
import PropTypes from "prop-types";

function TaskList({ tasksToDisplay, getAPITasksAction }) {
   useEffect(() => {
      (async () => {
         try {
            await getAPITasksAction();
         } catch (error) {
            console.error(error);
         }
      })();
   }, [getAPITasksAction]);

   const tasksList = useMemo(() => {
      return tasksToDisplay.map((task) => <TaskConnector task={task} key={task.id} />);
   }, [tasksToDisplay]);

   return <ul className={taskListCSS["all-tasks-container"]}>{tasksList}</ul>;
}

TaskList.propTypes = {
   tasksToDisplay: PropTypes.array,
   getAPITasksAction: PropTypes.func,
};

export default TaskList;
