import "../App.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { useCallback, useMemo } from "react";
import api from "../clients/item-client.js";
import { motion } from "framer-motion";

function Task({ task, setTasks, tasks }) {
   const addPokemonImage = useMemo(() => {
      return <img src={task.imageURL} className="pokemon-image" alt="pokemon" />;
   }, [task.imageURL]);

   const deleteButtonHandler = useCallback(async () => {
      await api.deleteTask(task.id);
      setTasks(tasks.filter((item) => item.id !== task.id));
   }, [setTasks, task.id, tasks]);

   return (
      <motion.li
         data-id={task.id}
         className="task-container"
         initial={{ x: -130, opacity: 0.3, scale: 0.6 }}
         animate={{ x: 0, opacity: 1, scale: 1 }}
      >
         <Checkbox task={task} setTasks={setTasks} />
         <div className="task">
            {task.text}
            {task.imageURL ? addPokemonImage : ""}
         </div>
         <Button
            buttonHandler={deleteButtonHandler}
            innerText={<i className="fa-solid fa-trash"></i>}
            className={"delete"}
         />
      </motion.li>
   );
}

export default Task;
