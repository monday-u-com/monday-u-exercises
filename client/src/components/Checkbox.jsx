import checkboxCSS from "./Checkbox.module.css";
import { useCallback } from "react";
import api from "../clients/item-client.js";
import PropTypes from "prop-types";

function Checkbox({ task, tasks, setTasks }) {
   const checkboxHandler = useCallback(async () => {
      try {
         await api.checkMarkTask(!task.status, task.id);
      } catch (error) {
         console.error(error);
      }

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

Checkbox.propTypes = {
   task: PropTypes.object,
   tasks: PropTypes.array,
   setTasks: PropTypes.func,
};

export default Checkbox;
