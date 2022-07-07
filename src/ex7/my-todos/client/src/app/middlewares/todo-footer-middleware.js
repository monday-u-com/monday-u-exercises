import ItemClient from "../../api/itemClient";
import actions from "../actions/constants";
import {spinner} from "../actions/spinner-actions";

const itemClient = new ItemClient();

export function clearAllTodos() {
    return async function clearAllTodosThunk(dispatch, getState) {
        spinner(dispatch, true);
        const response = await itemClient.deleteAllTodos();
        const todos = response.body;
        dispatch({type: actions.DELETE_ALL_TODOS, todos});

        spinner(dispatch, false);
    }
}

export function pendingTodos() {
    return async function pendingTodosThunk(dispatch, getState) {
        const response = await itemClient.getPendingTodos();
        const body = response.body;
        dispatch({type: actions.PENDING_TODOS, value: body.count});
    }
}