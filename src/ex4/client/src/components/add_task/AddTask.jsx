import React, { useState } from 'react'
import './AddTask.css'
import ItemClient from '../../api/itemClient'

function AddTask({ flag, setFlag }) {

    const [item, setItem] = useState('')

    const addItem = async () => {
        const client = new ItemClient()
        const response = await client.postItem(item)
        if (response.status !== 200) {
            alert("Something went wrong")
        }
        setItem("")
        setFlag(!flag)
    }

    return (
        <div className={'add-task-container'}>
            <input value={item} className={'add-task-input'} onChange={(e) => setItem(e.currentTarget.value)}></input>
            <button className={'add-task-button'} onClick={() => addItem()}>+</button>
        </div >
    )
}

export default AddTask