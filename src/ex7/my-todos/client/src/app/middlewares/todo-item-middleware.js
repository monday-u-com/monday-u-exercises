import ItemClient from "../../api/itemClient";
import actions from "../actions/constants";
import {spinner} from "../actions/spinner-actions";

const itemClient = new ItemClient();

export function editTodoItem(id, editObject) {
    return async function editTodoItemThunk(dispatch, getState) {
        spinner(dispatch, true);

        const response = await itemClient.editTodo(id, editObject);
        const todo = response.body;

        dispatch({type: actions.EDIT_TODO, todo});

        spinner(dispatch, false);
    }
}

export function deleteTodo(id) {
    return async function deleteTodoThunk(dispatch, getState) {
        spinner(dispatch, true);

        await itemClient.deleteTodo(id);

        dispatch({type: actions.DELETE_TODO, todo: {id}});

        spinner(dispatch, false);
    }
}