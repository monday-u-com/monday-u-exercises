import React, {useCallback} from "react";
import Select from "react-select";
import {todosSortByOptions} from "../../../../app/actions/todo-sort-by-actions";
import "./todo-sort-by.scss"

const TodoSortBy = ({setSortBy, sortByObject}) => {

    const changeSortOrder = useCallback(e => {
        setSortBy(e.value);
    }, [setSortBy]);

    return (
        <Select defaultValue={sortByObject} options={todosSortByOptions} id="select-sort" className="select-sort"
                onChange={changeSortOrder}/>
    );
};

export default TodoSortBy;