import actionTypes from "../actions/constants";
import {todosSortByOptions} from "../actions/todo-sort-by-actions";

const initialState = {
    sort: todosSortByOptions[0].value,
    label: todosSortByOptions[0].label,
    obj: todosSortByOptions[0]
};

const todoSortByReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SORT_VALUE: {
            const current = todosSortByOptions.find(({value}) => value == action.sort);
            console.log('current sort:', current);
            return {sort: action.sort, label: current.label, obj: current};
        }

        default:
            return state;
    }
};
export default todoSortByReducer;