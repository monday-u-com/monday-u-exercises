import React, {useCallback, useRef, useState} from "react";
import "./todo-item.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useClickOutside} from "../../../hooks/useClickOutside";


const inputProps = (editable, onApproveClick, resetEdit) => {
    const props = {
        disabled: !editable,
        className: `todo-message ${editable ? 'editable' : ''}`,
    }
    if (editable) {
        props.onKeyUp = e => {
            e.preventDefault();
            switch (e.key) {
                case 'Enter': {
                    onApproveClick();
                    break;
                }
                case 'Escape': {
                    resetEdit();
                    break;
                }
            }
        }
    }
    return props
}

const TodoItem = ({todo, editTodoItemAction, deleteTodoAction}) => {
    const [input, setInput] = useState(todo.item)
    const [editable, setEditable] = useState(false)

    const editRef = useRef();
    const inputRef = useRef();

    const resetEdit = () => {
        setEditable(false)
        setInput(todo.item)
    }

    useClickOutside(editRef, () => resetEdit())

    const onTodoClick = useCallback(e => {
        if (!editable) {
            alert(todo.message);
        }
    }, [editable]);

    const onCheckboxChange = useCallback(e => {
        const _checked = !todo.checked
        editTodoItemAction(todo.id, {
            checked: _checked,
            done_timestamp: Date.now()
        });
    }, [editTodoItemAction]);

    const onApproveClick = useCallback(e => {
        editTodoItemAction(todo.id, {item: input});
        setEditable(false);
    }, [editTodoItemAction, input]);

    const onDeleteClick = useCallback(e => {
        deleteTodoAction(todo.id);
    }, [deleteTodoAction]);

    const onEditClick = useCallback(e => {
        const _editable = !editable
        if (!_editable) {
            resetEdit()
        } else {
            setEditable(true)
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [editable, input]);

    const onInputChange = useCallback(e => {
        setInput(e.target.value);
    }, [input]);

    const editButton = todo.type === 'text' ?
        (
            <>
                <span
                    onClick={onApproveClick}
                    className={`icon-approve ${editable ? '' : 'hidden'}`}>
                    <FontAwesomeIcon
                        className="hover-zoom"
                        icon={faCheck}/>
                </span>
                <span
                    onClick={onEditClick}
                    className="icon-edit">
                    <FontAwesomeIcon
                        className="hover-zoom"
                        icon={faPen}/>
                </span>
            </>
        ) :
        (<></>);

    const pokemonImage = todo.type === 'pokemon' ?
        (<img className="pokemon-pic" src={todo.pokemon.image} alt=""/>) :
        (<>&emsp;&emsp;</>);

    return (
        <li className="todo-list-item" ref={editRef}>
            <input
                onChange={onCheckboxChange}
                type="checkbox"
                name="todoCheckbox"
                className="todo-checkbox"
                checked={todo.checked}/>
            <span className="todo-item-desc" onClick={onTodoClick}>
                {pokemonImage}
                <input
                    ref={inputRef}
                    onChange={onInputChange}
                    type="text"
                    {...inputProps(editable, onApproveClick, resetEdit)}
                    value={editable ? input : todo.message}/>
                </span>
            {editButton}
            <span
                onClick={onDeleteClick}
                className="icon-delete">
                <FontAwesomeIcon
                    className="hover-zoom"
                    icon={faTrash}/>
            </span>
        </li>
    );
};

export default TodoItem;