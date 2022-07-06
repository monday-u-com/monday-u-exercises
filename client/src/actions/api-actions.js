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

export const clearTasksAction = createAsyncThunk(actionTypes.CLEAR_TASKS, async () => {
   await api.clearTasks();
});

export const sortTasksAction = createAsyncThunk(actionTypes.SORT_TASKS, async (kind) => {
   const response = await api.sortTasks(kind);

   return response;
});

export const deleteTaskAction = createAsyncThunk(actionTypes.DELETE_TASK, async (id) => {
   await api.deleteTask(id);
});
