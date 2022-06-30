import React, { useState, useCallback, useRef, useMemo, useLayoutEffect } from "react";
import { faPen, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./TodoItem.scss";
import ItemClient from "../api/itemClient";
import { useClickOutside } from '../hooks/useClickOutside'

const itemClient = new ItemClient();

const messageProps = (editable, onApproveClick, onTodoClick) => {
    const props = {
        disabled: !editable,
        className: `todo-message ${editable ? 'editable' : ''}`,
    }
    if (editable) {
        props.onKeyUp = e => e.key === 'Enter' ? onApproveClick() : null
    } else {
        props.onClick = onTodoClick
    }
    return props
}

const saveCheckbox = async (id, todo, setChecked) => {
    todo.checked = !todo.checked
    await editTodo(id, todo)
    setChecked(todo.checked)
}

const editItem = async (id, todo, item) => {
    todo.item = item
    const newItem = await editTodo(id, todo)
    return newItem.body
}

const editTodo = async (id, todo) => {
    return await itemClient.editTodo(id, {
        type: todo.type,
        item: todo.item,
        checked: todo.checked,
        done_timestamp: Date.now()
    })
}

const TodoItem = ({ todo, setSpinner, changePendingTodos, refreshState }) => {
    const [checked, setChecked] = useState(!!todo.checked)
    const [item, setItem] = useState(todo.item)
    const [message, setMessage] = useState(todo.message)
    const [editable, setEditable] = useState(false)
    const inputRef = useRef();
    const editRef = useRef();
    useClickOutside(editRef, () => setEditable(false));


    const setTodo = (todo) => {
        setItem(todo.item)
        setChecked(todo.checked)
        setMessage(todo.message)
    }

    const pic = todo.type === 'pokemon' ?
        (<img className="pokemon-pic" src={todo.pokemon.image} alt="" />) :
        (<>&emsp;&emsp;</>);

    const onCheckboxChange = async () => {
        setSpinner(true);
        await saveCheckbox(todo.id, todo, setChecked)
        changePendingTodos(checked ? 1 : -1)
        setSpinner(false);
    }

    const onTodoClick = () => {
        alert(todo.message);
    }

    const onDeleteClick = async () => {
        setSpinner(true);
        await itemClient.deleteTodo(todo.id);
        refreshState({});
        setSpinner(false);
    }

    const onEditClick = async () => {
        setEditable(!editable)
    }

    const onApproveClick = async () => {
        setSpinner(true);
        const newItem = await editItem(todo.id, todo, item)
        setTodo(newItem)
        setEditable(false);
        setSpinner(false);
    }

    useLayoutEffect(() => {
        inputRef.current?.focus()
    }, [editable])

    const editBtn = todo.type === 'text' ?
        (
            <>
                <span
                    onClick={onApproveClick}
                    className={`icon-approve ${editable ? '' : 'hidden'}`}>
                    <FontAwesomeIcon
                        className="hover-zoom"
                        icon={faCheck} />
                </span>
                <span
                    onClick={onEditClick}
                    className="icon-edit">
                    <FontAwesomeIcon
                        className="hover-zoom"
                        icon={faPen} />
                </span>
            </>
        ) :
        (<></>);

    return (
        <li ref={editRef}>
            <input
                onChange={onCheckboxChange}
                type="checkbox"
                name="todoCheckbox"
                className="todo-checkbox"
                checked={checked} />
            {pic}
            <input
                ref={inputRef}
                type="text"
                {...messageProps(editable, onApproveClick, onTodoClick)}
                onChange={e => setItem(e.target.value)}
                value={editable ? item : message} />
            {editBtn}
            <span
                onClick={onDeleteClick}
                className="icon-delete">
                <FontAwesomeIcon
                    className="hover-zoom"
                    icon={faTrash} />
            </span>
        </li>
    );
};
export default TodoItem;