import actionTypes from "../actions/constants";

const initialState = {
    todos: []
};

const todoListReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.EDIT_TODO: {
            const currentItem = state.todos.find(todo => todo.id == action.todo.id);
            const currentIndex = state.todos.indexOf(currentItem);
            const todos = [...state.todos];
            todos[currentIndex] = action.todo;
            return {todos};
        }

        case actionTypes.FETCHED_TODOS: {
            return {todos: action.todos};
        }

        case actionTypes.DELETE_ALL_TODOS: {
            return {todos: []};
        }

        case actionTypes.DELETE_TODO: {
            return {todos: state.todos.filter(t => t.id != action.todo.id)};
        }

        default:
            return state;
    }
};
export default todoListReducer;