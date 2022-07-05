import taskCSS from "./Task.module.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { useCallback, useMemo } from "react";
import api from "../clients/item-client.js";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

function Task({ task, setTasks, tasks }) {
   const addPokemonImage = useMemo(() => {
      return <img src={task.imageURL} className={taskCSS["pokemon-image"]} alt="pokemon" />;
   }, [task.imageURL]);

   const deleteButtonHandler = useCallback(async () => {
      try {
         await api.deleteTask(task.id);
         setTasks(tasks.filter((item) => item.id !== task.id));
      } catch (error) {
         console.error(error);
      }
   }, [setTasks, task.id, tasks]);

   return (
      <motion.li
         data-id={task.id}
         className={taskCSS["task-container"]}
         whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
         initial={{ x: -130, opacity: 0.3, scale: 0.6 }}
         animate={{ x: 0, opacity: 1, scale: 1 }}
      >
         <Checkbox task={task} tasks={tasks} setTasks={setTasks} />
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
   tasks: PropTypes.array,
   setTasks: PropTypes.func,
};

export default Task;
