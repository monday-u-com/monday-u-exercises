import actionsTypes from "./constants";

const activeSpinner = () => ({
    type: actionsTypes.SPINNER_ACTIVE,
});

const disabledSpinner = () => ({
    type: actionsTypes.SPINNER_DISABLED
});

export const spinner = (dispatch, active) => {
    const type = active ? actionsTypes.SPINNER_ACTIVE : actionsTypes.SPINNER_DISABLED;
    dispatch({type});
}

export const toggleSpinner = (active) => {
    return dispatch => {
        if (active) {
            dispatch(activeSpinner());
        } else {
            dispatch(disabledSpinner());
        }
    };
}