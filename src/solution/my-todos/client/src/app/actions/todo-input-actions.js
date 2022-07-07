import actionsTypes from "./constants";
import {saveNewTodo} from "../middlewares/todo-input-middleware";

const badInput = () => ({
    type: actionsTypes.BAD_VALUE
});


export const addTodoAction = (input) => {
    return dispatch => {
        if (!input?.trim().length) {
            dispatch(badInput());
        } else {
            const saveNewTodoThunk = saveNewTodo(input); //actionsTypes.ADD_TODO
            dispatch(saveNewTodoThunk);
        }
    };
};