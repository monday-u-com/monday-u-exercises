import checkboxCSS from "./Checkbox.module.css";
import { useCallback } from "react";
import api from "../clients/item-client.js";

function Checkbox({ task, tasks, setTasks }) {
   const checkboxHandler = useCallback(async () => {
      await api.checkMarkTask(!task.status, task.id);

      let items = [...tasks];
      const index = items.findIndex((el) => el.id === task.id);
      items[index].status = !task.status;

      setTasks(items);
   }, [task, setTasks, tasks]);

   return (
      <input
         type="checkbox"
         className={checkboxCSS["my-checkbox"]}
         checked={task.status}
         onChange={checkboxHandler}
      />
   );
}

export default Checkbox;
