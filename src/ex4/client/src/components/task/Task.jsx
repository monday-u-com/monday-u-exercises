import React, { useState, useEffect } from 'react'
import './Task.css'
import Trash from '../../icons/Trash'
import ItemClient from '../../api/itemClient'



function Task({ item, flag, setFlag }) {

    const [checked, setChecked] = useState(item.status)

    const deleteItem = async (name) => {
        const client = new ItemClient()
        const result = await client.deleteItem(name)
        console.log(result)
        if (result.status !== 200) {
            alert("Something went wrong")
            return
        }
        setFlag(!flag)
    }

    const changeStatus = async (item) => {
        const client = new ItemClient()
        const result = await client.statusChanged(item)
        if (result.status !== 200) {
            alert("Something went wrong")
            return
        }
        setFlag(!flag)
        setChecked(prev => !prev)
    }

    return (
        <div className={"task-container"}>
            <input
                onChange={(e) => changeStatus({ item: item.itemName, status: e.target.checked })}
                type='checkbox'
                className={"task-checkbox"}
                checked={checked}>
            </input>
            <span className={"task-task-name"}>{item.itemName}</span>
            <div className={"task-trash-icon"} onClick={() => deleteItem(item.itemName)}>
                <Trash />
            </div>
        </div>
    )
}

export default Task