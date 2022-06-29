import "../App.css";
import Button from "./Button";
import Checkbox from "./Checkbox";
import { useCallback, useMemo } from "react";
import api from "../clients/item-client.js";

function Task({ task, setTasks }) {
   const addPokemonImage = useMemo(() => {
      return <img src={task.imageURL} className="pokemon-image" alt="pokemon" />;
   }, [task.imageURL]);

   const deleteButtonHandler = useCallback(async () => {
      await api.deleteTask(task.id);
      const allTasks = await api.getAllTasks();
      setTasks(allTasks);
   }, [setTasks, task.id]);

   return (
      <li data-id={task.id} className="task-container">
         <Checkbox />
         <div className="task">
            {task.text}
            {task.imageURL ? addPokemonImage : ""}
         </div>
         <Button
            buttonHandler={deleteButtonHandler}
            innerText={<i className="fa-solid fa-trash"></i>}
            className={"delete"}
         />
      </li>
   );
}

export default Task;
