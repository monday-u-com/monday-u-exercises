import React, { useState, useEffect } from "react";
import "./TodoInput.scss";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemClient from "../api/itemClient";
import PropTypes from 'prop-types'

const itemClient = new ItemClient();

let isAddingItem = false;

const addTodo = async (value) => {
    const todos = await itemClient.addTodo(value);
    _duplicatesTodos(todos.body);
}

const getClassname = (active) => ({
    className: active ? 'active' : ''
});

const _duplicatesTodos = (todos) => {
    const duplicates = todos.filter(todo => todo.type == 'pokemonExists' || todo.type == 'todoExists');
    if (!duplicates.length) {
        return;
    }
    let content = 'The following todos are already exist: \n';
    duplicates.forEach((todo) => {
        if(todo.type=='pokemonExists'){
            content += `id: ${todo.pokemon.id}, name: ${todo.pokemon.name} \n`;
        }else{
            content += `${todo.item}\n`
        }
    });
    alert(content);
}

const TodoInput = ({ refreshState, setSpinner }) => {
    const [input, setInput] = useState('');
    const [active, setActive] = useState(false);

    const onChange = (e) => {
        const value = e.target.value;
        setInput(e.target.value);
        setActive(!!value.length);
    }

    const onClick = async () => {
        if (isAddingItem) {
            return
        }
        isAddingItem = true;
        try {
            setSpinner(true);
            await addTodo(input);
            setInput('');
            setSpinner(false);
            refreshState({});
        } catch (e) {
            console.error(e);
        }
        isAddingItem = false;
    }

    const onKeyUp = (e) => input.length && e.key === 'Enter' ? onClick() : null;

    return (
        <div className="todo-input">
            <input onKeyUp={onKeyUp} onChange={onChange} id="todo-input" type="text" placeholder="Add your new todo" value={input}></input>
            <button onClick={onClick} id="todo-input-btn" {...getClassname(active)}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    );
};

TodoInput.propTypes = {
    setSpinner: PropTypes.func,
    refreshState: PropTypes.func,
}

export default TodoInput;