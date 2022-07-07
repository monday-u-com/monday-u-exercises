import React, {useCallback, useLayoutEffect, useState} from "react";
import "./todo-input.scss";
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const getClassname = (inputValue) => ({
    className: inputValue.length ? 'active' : ''
});

const TodoInput = ({addTodoAction, todosValue}) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        setInput('');
    }, [todosValue]);

    const onInputChange = useCallback(e => {
        setInput(e.target.value);
    }, [setInput]);

    const addTodo = useCallback(() => {
        addTodoAction(input);
    }, [addTodoAction, input]);

    const onKeyUp = (e) => input.length && e.key === 'Enter' ? addTodoAction(input) : null;

    return (
        <div className="todo-input">
            <input onKeyUp={onKeyUp} onChange={onInputChange} id="todo-input" type="text"
                   placeholder="Add your new todo" value={input}></input>
            <button onClick={addTodo} id="todo-input-btn" {...getClassname(input)}><FontAwesomeIcon icon={faPlus}/>
            </button>
        </div>
    );
};

// TodoInput.propTypes = {
// setSpinner: PropTypes.func,
// refreshState: PropTypes.func,
// }

export default TodoInput;