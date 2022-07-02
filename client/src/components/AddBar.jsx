import { useEffect, useCallback } from "react";
import { TextField } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import PropTypes from "prop-types";
import Button from "./Button";
import addBarCSS from "./AddBar.module.css";
import api from "../clients/item-client.js";

function AddBar({ inputText, setInputText, setTasks, setIsLoading }) {
   const addButtonHandler = useCallback(async () => {
      setIsLoading(true);

      if (inputText.trim().length === 0) {
         alert("Please fill in a task");
         setInputText("");
      } else {
         try {
            await api.addTask(inputText);
            const allTasks = await api.getAllTasks();
            allTasks ? setTasks(allTasks) : console.error("Server error");
         } catch (error) {
            console.error(error);
         }
         setInputText("");
      }
      setIsLoading(false);
   }, [inputText, setTasks, setIsLoading, setInputText]);

   const handleKeyPress = useCallback(
      (e) => {
         if (e.key === "Enter") addButtonHandler();
      },
      [addButtonHandler]
   );

   useEffect(() => {
      document.addEventListener("keypress", handleKeyPress);

      return () => {
         document.removeEventListener("keypress", handleKeyPress);
      };
   }, [inputText, handleKeyPress]);

   return (
      <div className={addBarCSS.container}>
         <TextField
            placeholder="Add your new to-do"
            size={TextField.sizes.MEDIUM}
            onChange={(text) => setInputText(text)}
            value={inputText}
            id={addBarCSS["task-text"]}
         />
         <Button
            buttonHandler={addButtonHandler}
            innerText={<i className={`${addBarCSS["fa-plus"]} fa-plus fa-solid`}></i>}
            className={addBarCSS["add-task"]}
         />
      </div>
   );
}

AddBar.propTypes = {
   inputText: PropTypes.string,
   setInputText: PropTypes.func,
   setTasks: PropTypes.func,
   setIsLoading: PropTypes.func,
};

export default AddBar;
