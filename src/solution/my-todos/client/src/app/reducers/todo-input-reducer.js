import actionTypes from "../actions/constants";

const initialState = {
    value: ''
};

const todoInputReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BAD_VALUE:
            return {value: state.value};

        case actionTypes.ADD_TODO: {
            return {value: action.value};
        }

        default:
            return state;
    }
};
export default todoInputReducer;