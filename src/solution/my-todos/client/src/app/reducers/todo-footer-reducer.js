import actionTypes from "../actions/constants";

const initialState = {
    value: 0
};

const todoFooterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PENDING_TODOS:
            return {value: action.value};

        default:
            return state;
    }
};
export default todoFooterReducer;