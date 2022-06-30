import { useEffect, useCallback } from "react";
import Button from "./Button";
import api from "../clients/item-client.js";
import addBarCSS from "./AddBar.module.css";

function AddBar({ inputText, setInputText, setTasks, setIsLoading }) {
   const addButtonHandler = useCallback(async () => {
      setIsLoading(true);
      const input = document.querySelector("input");
      if (input.value.trim().length === 0) {
         alert("Please fill in a task");
         input.value = "";
      } else {
         await api.addTask(inputText);
         const allTasks = await api.getAllTasks();
         setTasks(allTasks);
         input.value = "";
      }
      setIsLoading(false);
   }, [inputText, setTasks, setIsLoading]);

   const handleKeyPress = useCallback(
      (e) => {
         if (e.key === "Enter") addButtonHandler();
      },
      [addButtonHandler]
   );

   const inputTextHandler = (e) => {
      setInputText(e.target.value);
   };

   useEffect(() => {
      document.addEventListener("keypress", handleKeyPress);

      return () => {
         document.removeEventListener("keypress", handleKeyPress);
      };
   }, [inputText, handleKeyPress]);

   return (
      <div className={addBarCSS.container}>
         <input
            onChange={inputTextHandler}
            type="text"
            id={addBarCSS["task-text"]}
            name="task-text"
            placeholder="Add your new to-do"
         />
         <Button
            buttonHandler={addButtonHandler}
            innerText={<i className={`${addBarCSS["fa-plus"]} fa-plus fa-solid`}></i>}
            className={addBarCSS["add-task"]}
         />
      </div>
   );
}

export default AddBar;
