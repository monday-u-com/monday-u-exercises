import React from "react";
import TodoSortBy from "./todos-sort-by/todo-sort-by-connector";
import TodoSearch from "./todo-search/todo-search-connector";
import TodoStatus from "./todo-status/todo-status-connector";
import "./todo-filters.scss";

const TodoFilters = ({}) => {
    return (
        <div className="todo-filters">
            <TodoSortBy/>
            <TodoStatus/>
            <TodoSearch/>
        </div>
    );
};

export default TodoFilters;