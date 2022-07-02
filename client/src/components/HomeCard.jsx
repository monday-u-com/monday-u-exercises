import homeCardCSS from "./HomeCard.module.css";
import AddBar from "./AddBar";
import SortButtons from "./SortButtons";
import Tasks from "./Tasks";
import Loader from "./Loader";
import PendingTasks from "./PendingTasks";
import Button from "./Button";
import Titles from "./Titles";
import { useState, useCallback } from "react";
import api from "../clients/item-client.js";

function HomeCard() {
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
      <div className={homeCardCSS.card}>
         <Titles />
         <AddBar
            inputText={inputText}
            setInputText={setInputText}
            setTasks={setTasks}
            setIsLoading={setIsLoading}
         />
         <SortButtons tasks={tasks} setTasks={setTasks} />
         <div className={homeCardCSS["tasks-and-clear-container"]}>
            <Tasks tasks={tasks} setTasks={setTasks} setIsLoading={setIsLoading} />
            {isLoading === true ? <Loader /> : ""}
            <div className={homeCardCSS["footer-container"]}>
               <PendingTasks tasks={tasks} />
               <Button
                  buttonHandler={clearButtonHandler}
                  innerText={"Clear All"}
                  className={homeCardCSS["clear-all"]}
               />
            </div>
         </div>
      </div>
   );
}

export default HomeCard;
