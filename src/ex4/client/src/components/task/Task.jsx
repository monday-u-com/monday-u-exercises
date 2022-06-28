import React from 'react'
import './Task.css'
import Trash from '../../icons/Trash'
import ItemClient from '../../api/itemClient'



function Task({ name, flag, setFlag }) {

    const deleteItem = async (name) => {
        const client = new ItemClient()
        const result = await client.deleteItem(name)
        if (result.status !== 200) {
            alert("Something went wrong")
            return
        }
        setFlag(!flag)
    }

    return (
        <div className={"task-container"}>
            <input type='checkbox' className={"task-checkbox"}></input>
            <span className={"task-task-name"}>{name}</span>
            <div className={"task-trash-icon"} onClick={() => deleteItem(name)}>
                <Trash />
            </div>
        </div>
    )
}

export default Task