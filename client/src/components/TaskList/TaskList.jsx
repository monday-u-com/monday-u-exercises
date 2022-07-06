import { useEffect, useMemo } from "react";
import taskListCSS from "./TaskList.module.css";
import TaskConnector from "../Task/TaskConnector";
import PropTypes from "prop-types";

function TaskList({
   tasks,
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
   }, []);

   const tasksList = useMemo(
      () => tasks.map((task) => <TaskConnector task={task} key={task.id} />),
      [tasks]
   );

   return <ul className={taskListCSS["all-tasks-container"]}>{tasksList}</ul>;
}

TaskList.propTypes = {
   tasks: PropTypes.array,
   loaderShowAction: PropTypes.func,
   loaderHideAction: PropTypes.func,
   getAPITasksAction: PropTypes.func,
   setTasksAction: PropTypes.func,
};

export default TaskList;
