import actionsTypes from "./constants";

const searchTodo = (search) => ({
    type: actionsTypes.SEARCH_TODO,
    search
});

const badInputSearchTodo = () => ({
    type: actionsTypes.SEARCH_TODO_BAD_INPUT,
});

export const setTodoSearchAction = (input) => {
    return dispatch => {
        if (!input?.trim().length) {
            return dispatch(badInputSearchTodo(input));
        }
        dispatch(searchTodo(input));
    };
};