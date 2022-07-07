import ItemClient from "../../api/itemClient";
import actions from "../actions/constants";
import {spinner} from "../actions/spinner-actions";

const itemClient = new ItemClient();

export function fetchTodos({sort, search, status}) {
    return async function fetchTodosThunk(dispatch, getState) {
        spinner(dispatch, true);

        const response = await itemClient.getAllTodos({sort, search, status});
        const todos = response.body || [];

        dispatch({type: actions.FETCHED_TODOS, todos});

        spinner(dispatch, false);
    }
}
