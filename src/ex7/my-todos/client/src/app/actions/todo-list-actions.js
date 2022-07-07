import {fetchTodos} from "../middlewares/todo-list-middleware";

export const fetchTodosAction = ({sort, search, status}) => {
    return dispatch => {
        const fetchTodosThunk = fetchTodos({sort, search, status});
        dispatch(fetchTodosThunk);
    };
};
