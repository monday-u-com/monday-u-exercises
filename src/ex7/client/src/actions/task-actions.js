import {
  addTask as addTaskClient,
  getAllTasks as getAllTasksClient,
  removeAllTasks,
  removeTask,
  updateTask as updateTaskClient,
} from "../api/item_client";
import { getLastRemovedTasks } from "../selectors/items-entities-selectors";
import { store } from "../store";

import actionTypes from "./constants";

const addTask = (task) => ({
  type: actionTypes.ADD_TASK,
  task,
});

const getAllTasks = (result) => ({
  type: actionTypes.GET_ALL_TASKS,
  result,
});

const deleteAll = () => ({
  type: actionTypes.DELETE_ALL,
});

const deleteTask = (task) => ({
  type: actionTypes.DELETE_TASK,
  task,
});

const updateTask = (task) => ({
  type: actionTypes.UPDATE_TASK,
  task,
});

const restoreTask = (task) => ({
  type: actionTypes.RESTORE_TASK,
  task,
});

const toggleLoader = (toggle) => ({
  type: actionTypes.SET_LOADER,
  toggle,
});

export const addTaskAction = (task) => {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    addTaskClient(task)
      .then((response) => {
        if (response.status) dispatch(addTask(response.data));
        else alert(response.data);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};

export const getAllTasksAction = () => {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    getAllTasksClient()
      .then((response) => {
        dispatch(getAllTasks(response));
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};

export const deleteAllAction = () => {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    removeAllTasks()
      .then(() => {
        dispatch(deleteAll());
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};

export const deleteTaskAction = (task) => {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    removeTask(task)
      .then((response) => {
        if (response.status) dispatch(deleteTask(task));
        else alert(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};

export const updateTaskAction = (task) => {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    updateTaskClient(task)
      .then((response) => {
        if (response.status) dispatch(updateTask(task));
        else alert(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};

export const restoreTaskAction = () => {
  const state = store.getState();
  const lastTask = getLastRemovedTasks(state);
  return (dispatch) => {
    dispatch(toggleLoader(true));
    addTaskClient(lastTask.itemName)
      .then((response) => {
        if (response.status) dispatch(restoreTask(response.data));
        else alert(response.data);
      })
      .finally(() => {
        dispatch(toggleLoader(false));
      });
  };
};
