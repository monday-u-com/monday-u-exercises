import actionTypes from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../clients/item-client.js";

const setTasks = (tasks) => ({
   type: actionTypes.SET_TASKS,
   payload: tasks,
});

export const setTasksAction = (tasks) => {
   return (dispatch) => {
      dispatch(setTasks(tasks));
   };
};

export const getAPITasksAction = createAsyncThunk(actionTypes.GET_TASKS, async () => {
   const response = await api.getAllTasks();

   return response;
});

export const addTaskAction = createAsyncThunk(actionTypes.ADD_TASK, async (task) => {
   const response = await api.addTask(task);

   return response;
});
