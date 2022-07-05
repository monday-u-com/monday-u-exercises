import { useEffect, useMemo } from "react";
import taskListCSS from "./TaskList.module.css";
// import api from "../../clients/item-client.js";
import Task from "../Task";
// import PropTypes from "prop-types";

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
      () => tasks.map((task) => <Task task={task} key={task.id} tasks={tasks} />),
      [tasks]
   );

   return <ul className={taskListCSS["all-tasks-container"]}>{tasksList}</ul>;
}

// TaskList.propTypes = {
//    tasks: PropTypes.array,
//    setTasks: PropTypes.func,
// };

export default TaskList;
