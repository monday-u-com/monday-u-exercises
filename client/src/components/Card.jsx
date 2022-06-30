import cardCSS from "./Card.module.css";
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
   const [isLoading, setIsLoading] = useState(true);

   const clearButtonHandler = useCallback(async () => {
      try {
         await api.clearTasks();
         setTasks([]);
      } catch (error) {
         console.error(error);
      }
   }, []);

   return (
      <div className={cardCSS.card}>
         <Titles />
         <AddBar
            inputText={inputText}
            setInputText={setInputText}
            setTasks={setTasks}
            setIsLoading={setIsLoading}
         />
         <SortButtons tasks={tasks} setTasks={setTasks} />
         <div className={cardCSS["tasks-and-clear-container"]}>
            <Tasks tasks={tasks} setTasks={setTasks} setIsLoading={setIsLoading} />
            {isLoading === true ? <Loader /> : ""}
            <div className={cardCSS["footer-container"]}>
               <PendingTasks tasks={tasks} />
               <Button
                  buttonHandler={clearButtonHandler}
                  innerText={"Clear All"}
                  className={cardCSS["clear-all"]}
               />
            </div>
         </div>
      </div>
   );
}

export default Card;
