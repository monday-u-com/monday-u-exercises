import "../App.css";
import Checkbox from "./Checkbox";

function Task({ task }) {
   const addPokemonImage = () => {
      return <img src={task.imageURL} className="pokemon-image" alt="pokemon image" />;
   };

   return (
      <li data-id={task.id} className="task-container">
         <Checkbox />
         <div className="task">
            {task.text}
            {task.imageURL ? addPokemonImage() : ""}
         </div>
      </li>
   );
}

export default Task;
