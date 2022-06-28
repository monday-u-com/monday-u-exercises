import React from 'react'
import './AddTask.css'

function AddTask({ children }) {
    return (
        <div className={'add-task-container'}>
            <input className={'add-task-input'}></input>
            <button className={'add-task-button'}>+</button>
        </div >
    )
}

export default AddTask