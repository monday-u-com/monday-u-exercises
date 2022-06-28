import "../App.css";
import Button from "./Button";
import Checkbox from "./Checkbox";

function Task({ task }) {
   const addPokemonImage = () => {
      return <img src={task.imageURL} className="pokemon-image" alt="pokemon" />;
   };

   return (
      <li data-id={task.id} className="task-container">
         <Checkbox />
         <div className="task">
            {task.text}
            {task.imageURL ? addPokemonImage() : ""}
         </div>
         <Button innerText={<i className="fa-solid fa-trash"></i>} className={"delete"} />
      </li>
   );
}

export default Task;
