import "../App.css";
import Checkbox from "./Checkbox";

function Task({ task }) {
   const addPokemonImage = () => {
      return <img src="task.imageURL" className="pokemon-image" />;
   };

   return (
      <li data-id={task.id} className="task-container">
         <Checkbox />
         <div className="task">{task.text}</div>
         {task.imageURL ? addPokemonImage() : ""}
      </li>
   );
}

export default Task;
