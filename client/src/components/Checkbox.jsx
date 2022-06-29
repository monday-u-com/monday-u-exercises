import "../App.css";
import { useCallback, useEffect } from "react";
import api from "../clients/item-client.js";

function Checkbox({ task, setTasks }) {
   const checkboxHandler = useCallback(
      async (e) => {
         console.log(task);
         console.log(task.status);
         await api.checkMarkTask(e.target.checked, task.id);
         const allTasks = await api.getAllTasks();
         setTasks(allTasks);
      },
      [task, setTasks]
   );

   return (
      <input
         type="checkbox"
         className="my-checkbox"
         checked={task.status}
         onChange={checkboxHandler}
      />
   );
}

export default Checkbox;
