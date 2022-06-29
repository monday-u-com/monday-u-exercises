import "../App.css";
import AddBar from "./AddBar";
import SortButtons from "./SortButtons";
import Tasks from "./Tasks";
import Loader from "./Loader";
import PendingTasks from "./PendingTasks";
import Button from "./Button";
import Titles from "./Titles";
import { useState, useCallback } from "react";
import api from "../clients/item-client.js";

function Card() {
   const [tasks, setTasks] = useState([]);
   const [inputText, setInputText] = useState("");

   const clearButtonHandler = useCallback(async () => {
      await api.clearTasks();
      setTasks([]);
   }, []);

   return (
      <div className="card">
         <Titles />
         <AddBar inputText={inputText} setInputText={setInputText} setTasks={setTasks} />
         <SortButtons tasks={tasks} setTasks={setTasks} />
         <div className="tasks-and-clear-container">
            <Tasks tasks={tasks} setTasks={setTasks} />
            <Loader />
            <div className="footer-container">
               <PendingTasks tasks={tasks} />
               <Button
                  buttonHandler={clearButtonHandler}
                  innerText={"Clear All"}
                  className={"clear-all"}
               />
            </div>
         </div>
      </div>
   );
}

export default Card;
