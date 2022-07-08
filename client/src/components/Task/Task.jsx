import taskCSS from "./Task.module.css";
import Button from "../Button";
import CheckboxConnector from "../Checkbox/CheckboxConnector";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import toastOptions from "../../clients/toast-options";

function Task({ task, deleteTaskAction, undoDeleteTaskAction, getAPITasksAction, setTasksAction }) {
   const addPokemonImage = useMemo(() => {
      return <img src={task.imageURL} className={taskCSS["pokemon-image"]} alt="pokemon" />;
   }, [task.imageURL]);

   const deleteButtonHandler = useCallback(async () => {
      try {
         await deleteTaskAction(task.id);
         toast.error(<Undo />, toastOptions);
      } catch (error) {
         console.error(error);
      }
   }, [task.id, deleteTaskAction]);

   const Undo = () => {
      const handleClick = async () => {
         await undoDeleteTaskAction();
         const response = await getAPITasksAction();
         const allTasks = response.payload;
         allTasks ? setTasksAction(allTasks) : console.error("Server error");
      };

      return (
         <div className={taskCSS["deleted-message"]}>
            Row Deleted{" "}
            <button onClick={handleClick} className={taskCSS["undo-btn"]}>
               Undo
            </button>
         </div>
      );
   };

   return (
      <motion.li
         data-id={task.id}
         className={taskCSS["task-container"]}
         whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
         initial={{ x: -130, opacity: 0.3, scale: 0.6 }}
         animate={{ x: 0, opacity: 1, scale: 1 }}
      >
         <CheckboxConnector task={task} />
         <div className={taskCSS.task}>
            {task.text}
            {task.imageURL ? addPokemonImage : ""}
         </div>
         <Button
            onClick={deleteButtonHandler}
            innerText={<i className={`${taskCSS["fa-trash"]} fa-trash fa-solid`}></i>}
            className={taskCSS.delete}
         />
      </motion.li>
   );
}

Task.propTypes = {
   task: PropTypes.object,
   deleteTaskAction: PropTypes.func,
   undoDeleteTaskAction: PropTypes.func,
};

export default Task;
