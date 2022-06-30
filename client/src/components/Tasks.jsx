import { useEffect, useMemo } from "react";
import tasksCSS from "./Tasks.module.css";
import api from "../clients/item-client.js";
import Task from "./Task";
import PropTypes from "prop-types";

function Tasks({ tasks, setTasks, setIsLoading }) {
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         try {
            const allTasks = await api.getAllTasks();
            allTasks ? setTasks(allTasks) : console.error("Server error");
         } catch (error) {
            console.error(error);
         }
         setIsLoading(false);
      })();
   }, [setTasks, setIsLoading]);

   const tasksList = useMemo(
      () =>
         [...tasks].map((task) => (
            <Task task={task} key={task.id} setTasks={setTasks} tasks={tasks} />
         )),
      [tasks, setTasks]
   );

   return <ul className={tasksCSS["all-tasks-container"]}>{tasksList}</ul>;
}

Tasks.propTypes = {
   tasks: PropTypes.array,
   setTasks: PropTypes.func,
   setIsLoading: PropTypes.func,
};

export default Tasks;
