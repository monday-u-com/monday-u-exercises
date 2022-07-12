import checkboxCSS from "./Checkbox.module.css";
import { useCallback } from "react";
import PropTypes from "prop-types";

function Checkbox({ task, checkMarkTaskAction }) {
   const checkboxHandler = useCallback(async () => {
      try {
         await checkMarkTaskAction(task);
      } catch (error) {
         console.error(error);
      }
   }, [task, checkMarkTaskAction]);

   return (
      <input
         type="checkbox"
         className={checkboxCSS["my-checkbox"]}
         checked={task.status}
         onChange={checkboxHandler}
         data-testid={task.id}
      />
   );
}

Checkbox.propTypes = {
   task: PropTypes.object,
   checkMarkTaskAction: PropTypes.func,
};

export default Checkbox;
