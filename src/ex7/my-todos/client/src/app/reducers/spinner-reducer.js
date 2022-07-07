import actions from "../actions/constants";

const initialState = {
    active: false
};

const spinnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SPINNER_ACTIVE : {
            return {active: true};
        }
        case actions.SPINNER_DISABLED : {
            return {active: false};
        }

        default:
            return state;
    }
};

export default spinnerReducer;
