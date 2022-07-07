import React, {useEffect} from "react";
import "./todo-list.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard} from "@fortawesome/free-solid-svg-icons";
import TodoItem from "../todo-item/todo-item-connector";

const emptyTodo = () => (
    <p className="empty-todo-list">
        Well done your todo list is empty <br/>
        <span className="icon">
                    <FontAwesomeIcon icon={faClipboard}/> <br/>
                </span>
        Now you will not forget anything :)
    </p>
)

const TodoList = ({fetchTodosAction, inputValue, searchValue, sortByValue, todosValue, statusValue}) => {

    useEffect(() => {
        fetchTodosAction({sort: sortByValue, search: searchValue, status: statusValue})
    }, [inputValue, sortByValue, searchValue, statusValue])

    return !todosValue.length ? emptyTodo() : (
        <ul id="todos-list" className="todo-list">
            {todosValue.map(todo => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </ul>
    );
};

export default TodoList;