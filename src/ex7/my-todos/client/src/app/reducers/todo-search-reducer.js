import actionTypes from "../actions/constants";

const initialState = {
    search: ''
};

const todoSearchReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SEARCH_TODO: {
            return {search: action.search};
        }

        case actionTypes.SEARCH_TODO_BAD_INPUT: {
            return {search: initialState.search};
        }

        default:
            return state;
    }
};
export default todoSearchReducer;