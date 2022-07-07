import React from "react";
import "./todo-page.scss";
import Spinner from "../../spinner/spinner-connector";
import TodoList from "../todo-list/todo-list-connector";
import TodoInput from "../todo-input/todo-input-connector";
import TodoFooter from "../todo-footer/todo-footer-connector";
import TodoFilters from "../todo-filters/todo-filters-connector";

const TodoPage = () => {
    return (
        <>
            <Spinner></Spinner>
            <div className="container">
                <div className="card">
                    <h1>Don't Forget Me</h1>

                    <TodoInput/>

                    <TodoFilters/>

                    <TodoList/>

                    <TodoFooter/>
                </div>
            </div>
        </>
    );
};

export default TodoPage;