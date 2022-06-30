import React, { useState, useEffect, useMemo } from "react";
import TodoInput from "../todo-input/TodoInput";
import "./TodoPage.scss";
import TodoList from "../todo-list/TodoList";
import Spinner from "../spinner/Spinner";
import ItemClient from "../api/itemClient";
import Select from 'react-select';

const itemClient = new ItemClient();
const options = [
    { label: 'A-Z', value: 'ASC' },
    { label: 'Z-A', value: 'DESC' }
];

const clearTodos = async () => {
    await itemClient.deleteAllTodos();
}

const TodoPage = () => {
    const [spinner, setSpinner] = useState(true);
    const [todos, setTodos] = useState([]);
    const [pendingTodos, setPendingTodos] = useState(0);

    const [state, refreshState] = useState([]);

    const fetchPage = async (sortBy) => {
        setSpinner(true);
        try {
            const [todos, pendingTodos] = await Promise.all([
                itemClient.getAllTodos(sortBy),
                itemClient.getPendingTodos()
            ]);
            setTodos(todos.body);
            setPendingTodos(pendingTodos.body.count);
        } catch (e) {
            console.error(e);
        }
        setSpinner(false);
    }

    useEffect(() => {
        (async () => {
            await fetchPage();
        })();
    }, [])

    useMemo(() => {
        (async () => {
            await fetchPage();
        })();
    }, [state]);

    const changePendingTodos = (inc) => setPendingTodos(pendingTodos + inc);

    const clearAllClick = async () => {
        setSpinner(true);
        await clearTodos();
        await fetchPage();
        setSpinner(false);
    }

    const changeSortOrder = async (event) => {
        await fetchPage(event.value);
    }

    return (
        <>
            <Spinner display={spinner}></Spinner>
            <div className="container">
                <div className="card">
                    <h1>Don't Forget Me</h1>
                    <TodoInput refreshState={refreshState} setSpinner={setSpinner} />

                    <Select options={options} id="select-sort" className="select-sort" onChange={changeSortOrder} />

                    <TodoList todos={todos} setSpinner={setSpinner} refreshState={refreshState} changePendingTodos={changePendingTodos} />

                    <ul id="todo-list" className="todo-list"></ul>

                    <div className="footer">
                        <span>You have <span className="pending-todos">{pendingTodos}</span> pending tasks</span>
                        <button onClick={clearAllClick} id="footer-btn" className={todos.length ? 'active' : ''}>Clear All</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoPage;