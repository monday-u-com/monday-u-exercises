import React, {useCallback, useState} from "react";
import "./TodoSearch.scss";

let _timeout;

const TodoSearch = ({setTodoSearchAction}) => {
    const [search, setSearch] = useState('');

    const onSearchInputChange = useCallback(e => {
        const value = e.target.value
        setSearch(value)

        if (_timeout) {
            clearTimeout(_timeout);
        }
        _timeout = setTimeout(() => {
            setTodoSearchAction(value);
            clearTimeout(_timeout);
        }, 1500)

    }, [search]);

    return (
        <div className="todo-search">
            <input onChange={onSearchInputChange} id="todo-search" type="text"
                   placeholder="Search..." value={search}></input>
        </div>
    );
};

export default TodoSearch;