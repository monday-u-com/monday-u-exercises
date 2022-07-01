import React, { useEffect, useState } from "react";
import styles from "./TodoApp.module.css";
import MyToast from "./MyToast";
import {
  handleNewItem,
  getAllTasks,
  deleteAllTasks,
} from "../../serverApi/itemClient";
import ListItems from "./ListItems";
import UserInput from "./UserInput";
import Sort from "./Sort";
import Button from "./Button";

const TodoApp = () => {
  const [data, setData] = useState([]);
  const [toastProps, setToastProps] = useState({
    showToast: false,
    toastType: "",
    message: "",
  });

  const removeIdFromData = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  const checkIfTextAlreadyExist = (taskText) => {
    const taskList = data.map((item) => item.itemName);
    const result = taskList.includes(taskText) ? true : false;
    return result;
  };
  const changeItemValueInData = (id, valueName, newValue) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          item[valueName] = newValue;
        }
        return item;
      })
    );
  };

  const NewInputHandler = async (userInputRef) => {
    if (!userInputRef.current.value) {
      alert("Emty input is not valid");
    } else {
      const userInput = userInputRef.current.value;
      userInputRef.current.value = "";
      const addNewItemsResult = await handleNewItem(userInput);

      if (
        addNewItemsResult.result === "success" &&
        addNewItemsResult.data.length
      ) {
        setData([...data, ...addNewItemsResult.data]);
        setToastProps({
          showToast: true,
          toastType: "POSITIVE",
          message: "Successfully add new items",
        });
        setTimeout(() => {
          setToastProps({
            showToast: false,
            toastType: "",
            message: "",
          });
        }, 5000);
      } else if (addNewItemsResult.data.length === 0) {
        setToastProps({
          showToast: true,
          toastType: "",
          message: "Spaces and comma alone are not enough.",
        });
      } else {
        setToastProps({
          showToast: true,
          toastType: "NEGATIVE",
          message: addNewItemsResult.data,
        });
      }
    }
  };

  const deleteAllHandler = async () => {
    const deleteAllResult = await deleteAllTasks();
    if (deleteAllResult.result === "success") {
      setData([]);
    } else {
      setToastProps({
        showToast: true,
        toastType: "NEGATIVE",
        message: deleteAllResult.data,
      });
    }
  };

  const getPendingTasksAmount = () => {
    const pendingTasks = data.filter((item) => !item.status);
    return pendingTasks.length;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDataResult = await getAllTasks();
      if (fetchedDataResult.result === "success") {
        setData(fetchedDataResult.data);
      } else {
        setToastProps({
          showToast: true,
          toastType: "NEGATIVE",
          message: fetchedDataResult.data,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.appContainer}>
      <MyToast property={toastProps} setToastProps={setToastProps} />
      <div className={styles.appTitle}>Todo App</div>
      <UserInput onClickAddButtonHandler={NewInputHandler} />
      <Sort onClickSortUpdateData={setData} setToastProps={setToastProps} />
      <ListItems
        data={data}
        removeIdFromDataHandler={removeIdFromData}
        onChangeValueUpdateData={changeItemValueInData}
        setToastProps={setToastProps}
        checkIfTextAlreadyExist={checkIfTextAlreadyExist}
      />
      {data.length ? (
        <div className={styles.buttomBarContainer}>
          <span> The amount of pending task is: {getPendingTasksAmount()}</span>
          <Button
            buttonClass={"clearAllButton"}
            value={"Clear all"}
            onClickHandler={deleteAllHandler}
          >
            Clear All
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default TodoApp;
