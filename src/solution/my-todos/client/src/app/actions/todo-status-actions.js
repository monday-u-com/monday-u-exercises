import actionsTypes from "./constants";

export const todosStatusOptions = [
    {label: 'Pending', value: 'pending'},
    {label: 'Completed', value: 'done'}
];

const statusValue = (array) => ({
    type: actionsTypes.STATUS_VALUE,
    array
});


export const setStatusAction = (array) => {
    return dispatch => {
        dispatch(statusValue(array));
    };
};
