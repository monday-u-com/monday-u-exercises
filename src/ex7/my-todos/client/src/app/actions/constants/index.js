const actions = {
    // Spinner
    SPINNER_ACTIVE: "SPINNER_ACTIVE",
    SPINNER_DISABLED: "SPINNER_DISABLED",

    // Todo List
    FETCHED_TODOS: "FETCHED_TODOS",

    // Todo Input
    ADD_TODO: "ADD_TODO",
    BAD_VALUE: "INCREMENT",
    TODOS_LOADED: "TODOS_LOADED",

    // Todo Item
    EDIT_TODO: "EDIT_TODO",
    DELETE_TODO: "DELETE_TODO",

    // Todo Sort by
    SORT_VALUE: "SORT_VALUE",

    // Todo Search
    SEARCH_TODO: "SEARCH_TODO",
    SEARCH_TODO_BAD_INPUT: "SEARCH_TODO_BAD_INPUT",

    // Todo Status
    STATUS_VALUE: "STATUS_VALUE",

    // Todo Footer
    DELETE_ALL_TODOS: "DELETE_ALL_TODOS",
    PENDING_TODOS: "PENDING_TODOS",
};

export default actions;
