import {clearAllTodos, pendingTodos} from "../middlewares/todo-footer-middleware";

export const clearAllAction = () => {
    return dispatch => {
        const clearAllTodosThunk = clearAllTodos(); //actionsTypes.ADD_TODO;
        dispatch(clearAllTodosThunk);
    };
};

export const getPendingTodosAction = () => {
    return dispatch => {
        const pendingTodosThunk = pendingTodos(); //actionsTypes.ADD_TODO
        dispatch(pendingTodosThunk);
    };
};