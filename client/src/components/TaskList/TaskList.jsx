import { useEffect, useMemo } from "react";
import taskListCSS from "./TaskList.module.css";
import api from "../../clients/item-client.js";
import Task from "../Task";
import PropTypes from "prop-types";

function TaskList({ tasks, setTasks, loaderShowAction, loaderHideAction }) {
   useEffect(() => {
      (async () => {
         loaderShowAction();
         try {
            const allTasks = await api.getAllTasks();
            allTasks ? setTasks(allTasks) : console.error("Server error");
         } catch (error) {
            console.error(error);
         }
         loaderHideAction();
      })();
   }, [setTasks]);

   const tasksList = useMemo(
      () =>
         tasks.map((task) => <Task task={task} key={task.id} setTasks={setTasks} tasks={tasks} />),
      [tasks, setTasks]
   );

   return <ul className={taskListCSS["all-tasks-container"]}>{tasksList}</ul>;
}

TaskList.propTypes = {
   tasks: PropTypes.array,
   setTasks: PropTypes.func,
};

export default TaskList;
