import {
  addTask,
  getAllTasks,
  removeAllTasks,
  removeTask,
  updateTask,
} from "../api/item_client";
import actionTypes from "./constants";

const add_task = (task) => ({
  type: actionTypes.ADD_TASK,
  task,
});

const get_all_tasks = (result) => ({
  type: actionTypes.GET_ALL_TASKS,
  result,
});

const delete_all = () => ({
  type: actionTypes.DELETE_ALL,
});

const delete_task = (task) => ({
  type: actionTypes.DELETE_TASK,
  task,
});

const update_task = (task) => ({
  type: actionTypes.UPDATE_TASK,
  task,
});

const restore_task = (task) =>({
  type: actionTypes.RESTORE_TASK,
  task,
})

export const addTaskAction = (task) => {
  return (dispatch) => {
    addTask(task).then((response) => {
      if (response.status) dispatch(add_task(response.data));
      else alert(response.data);
    });
  };
};


export const getAllTasksAction = () => {
  return (dispatch) => {
    getAllTasks().then((response) => {
      dispatch(get_all_tasks(response));
    });
  };
};

export const deleteAllAction = () => {
  return (dispatch) => {
    removeAllTasks().then(() => {
      dispatch(delete_all());
    });
  };
};

export const deleteTaskAction = (task) => {
  return (dispatch) => {
    removeTask(task)
      .then((response) => {
        if (response.status) dispatch(delete_task(task));
        else alert(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
};

export const updateTaskAction = (task) => {
  return (dispatch) => {
    updateTask(task)
      .then((response) => {
        if (response.status) dispatch(update_task(task));
        else alert(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
};

export const restoreTaskAction = (task) =>{
  return (dispatch) => {
    addTask(task.itemName).then((response) => {
      if (response.status) dispatch(restore_task(response.data));
      else alert(response.data);
    });
  };
}