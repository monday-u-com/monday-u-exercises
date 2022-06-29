import { useEffect } from "react";
import "../App.css";
import api from "../clients/item-client.js";
import Task from "./Task";

function Tasks({ tasks, setTasks }) {
   useEffect(() => {
      (async () => {
         let allTasks = await api.getAllTasks();
         setTasks(allTasks);
      })();
   }, [setTasks]);

   const tasksList = [...tasks].map((task) => (
      <Task task={task} key={task.id} setTasks={setTasks} />
   ));

   return <ul className="all-tasks-container">{tasksList}</ul>;
}

export default Tasks;
