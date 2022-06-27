import "../App.css";
import AddBar from "./AddBar";
import SortButtons from "./SortButtons";
import Tasks from "./Tasks";
import Loader from "./Loader";
import PendingTasks from "./PendingTasks";
import Button from "./Button";
import Titles from "./Titles";
import { useState } from "react";

function Card() {
   const [tasks, setTasks] = useState([]);
   const [inputText, setInputText] = useState("");

   return (
      <div className="card">
         <Titles />
         <AddBar inputText={inputText} setInputText={setInputText} />
         <SortButtons />
         <div className="tasks-and-clear-container">
            <Tasks />
            <Loader />
            <div className="footer-container">
               <PendingTasks />
               <Button innerText={"Clear All"} className={"clear-all"} />
            </div>
         </div>
      </div>
   );
}

export default Card;
