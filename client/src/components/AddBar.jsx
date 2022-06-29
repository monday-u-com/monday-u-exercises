import { useEffect, useCallback } from "react";
import "../App.css";
import Button from "./Button";
import api from "../clients/item-client.js";

function AddBar({ inputText, setInputText, setTasks }) {
   const buttonHandler = useCallback(async () => {
      await api.addTask(inputText);
      const allTasks = await api.getAllTasks();
      setTasks(allTasks);
   }, [inputText]);

   const handleKeyPress = (e) => {
      if (e.key === "Enter") buttonHandler();
   };

   const inputTextHandler = (e) => {
      setInputText(e.target.value);
   };

   useEffect(() => {
      document.addEventListener("keypress", handleKeyPress);

      return () => {
         document.removeEventListener("keypress", handleKeyPress);
      };
   }, [inputText]);

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
            buttonHandler={buttonHandler}
            innerText={<i className="fa-solid fa-plus"></i>}
            className={"add-task"}
         />
      </div>
   );
}

export default AddBar;
