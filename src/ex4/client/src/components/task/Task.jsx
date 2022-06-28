import React from 'react'
import './Task.css'
import Trash from '../../icons/Trash'

function Task({ name }) {
    return (
        <div className={"task-container"}>
            <input type='checkbox'></input>
            {name}
            <Trash />
        </div>
    )
}

export default Task