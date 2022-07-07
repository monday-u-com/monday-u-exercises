import {deleteTodo, editTodoItem} from "../middlewares/todo-item-middleware";

export const editTodoItemAction = (id, updateObject) => {
    return dispatch => {
        const editTodoItemThunk = editTodoItem(id, updateObject);
        dispatch(editTodoItemThunk);
    };
};

export const deleteTodoAction = (todo) => {
    return dispatch => {
        const deleteTodoThunk = deleteTodo(todo);
        dispatch(deleteTodoThunk);
    };
};



