import { useEffect, useMemo } from "react";
import tasksCSS from "./Tasks.module.css";
import api from "../clients/item-client.js";
import Task from "./Task";

function Tasks({ tasks, setTasks, setIsLoading }) {
   useEffect(() => {
      (async () => {
         setIsLoading(true);
         let allTasks = await api.getAllTasks();
         setTasks(allTasks);
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

export default Tasks;
