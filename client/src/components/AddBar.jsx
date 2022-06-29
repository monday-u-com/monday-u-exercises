import { useEffect, useCallback } from "react";
import "../App.css";
import Button from "./Button";
import api from "../clients/item-client.js";

function AddBar({ inputText, setInputText, setTasks }) {
   const addButtonHandler = useCallback(async () => {
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
   }, [inputText, setTasks]);

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
      <div className="container">
         <input
            onChange={inputTextHandler}
            type="text"
            id="task-text"
            name="task-text"
            placeholder="Add your new to-do"
         />
         <Button
            buttonHandler={addButtonHandler}
            innerText={<i className="fa-solid fa-plus"></i>}
            className={"add-task"}
         />
      </div>
   );
}

export default AddBar;
