import React, {useCallback} from "react";
import Select from "react-select";
import {todosStatusOptions} from "../../../../app/actions/todo-status-actions";
import "./todo-status.scss";

const TodoStatus = ({setStatusAction, todoStatusArray}) => {

    const changeSortOrder = useCallback(statusArray => {
        setStatusAction(statusArray);
    }, [setStatusAction]);

    return (
        <Select isMulti={true} defaultValue={todoStatusArray} options={todosStatusOptions} id="select-status"
                className="select-status"
                onChange={changeSortOrder}/>
    );
};

export default TodoStatus;