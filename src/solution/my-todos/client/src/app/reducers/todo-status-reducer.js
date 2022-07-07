import actionTypes from "../actions/constants";
import {todosStatusOptions} from "../actions/todo-status-actions";

const initialState = {
    array: todosStatusOptions,
};

const todoStatusReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.STATUS_VALUE: {
            console.log('current statuses:', action.array);
            return {array: action.array};
        }

        default:
            return state;
    }
};
export default todoStatusReducer;