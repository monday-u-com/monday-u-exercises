import React from 'react'
import './Task.css'
import Trash from '../../icons/Trash'

function Task({ name }) {
    return (
        <div className={"task-container"}>
            <input type='checkbox' className={"task-checkbox"}></input>
            <span className={"task-task-name"}>{name}</span>
            <div className={"task-trash-icon"}>
                <Trash />
            </div>
        </div>
    )
}

export default Task