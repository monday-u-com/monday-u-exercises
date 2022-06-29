import "../App.css";
import { useCallback } from "react";
import api from "../clients/item-client.js";

function Checkbox({ task, setTasks }) {
   const checkboxHandler = useCallback(async () => {
      const allTasks = await api.checkMarkTask(!task.status, task.id);
      setTasks(allTasks);
   }, [task, setTasks]);

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
