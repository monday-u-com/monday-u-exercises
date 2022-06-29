import React, { useState } from 'react'
import ItemClient from '../../api/itemClient'
import styles from './AddTask.module.css'
import PropTypes from 'prop-types';

function AddTask({ flag, setFlag, setLoading }) {

    const [item, setItem] = useState('')

    const addItem = async () => {
        setLoading(true)
        const client = new ItemClient()
        if (item !== "") {
            const response = await client.postItem(item)
            if (response.status !== 200) {
                setLoading(false)
                alert("Something went wrong")
                return
            }
            setItem("")
            setFlag(!flag)
            setLoading(false)
        } else {
            alert("Please enter a valid task")
        }
    }

    return (
        <div className={styles.add_task_container}>
            <input value={item} className={styles.add_task_input} onChange={(e) => setItem(e.currentTarget.value)}></input>
            <button className={styles.add_task_button} onClick={() => addItem()}>+</button>
        </div >
    )
}

AddTask.propTypes = {
    flag: PropTypes.bool,
    setFlag: PropTypes.func,
    setLoading: PropTypes.func
}

export default AddTask