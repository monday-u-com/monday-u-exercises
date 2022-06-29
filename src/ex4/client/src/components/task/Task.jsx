import React, { useState } from 'react'
import styles from './Task.module.css'
import Trash from '../../icons/Trash'
import ItemClient from '../../api/itemClient'
import PropTypes from 'prop-types';

function Task({ item, setFlag, setLoading }) {

    const [checked, setChecked] = useState(item.status)

    const deleteItem = async (name) => {
        setLoading(true)
        const client = new ItemClient()
        const result = await client.deleteItem(name)
        if (result.status !== 200) {
            setLoading(false)
            alert("Something went wrong")
            return
        }
        setFlag(prev => !prev)
        setLoading(false)
    }

    const changeStatus = async (item) => {
        setLoading(true)
        const client = new ItemClient()
        const result = await client.statusChanged(item)
        if (result.status !== 200) {
            setLoading(false)
            alert("Something went wrong")
            return
        }
        setFlag(prev => !prev)
        setChecked(prev => !prev)
        setLoading(false)
    }

    return (
        <div className={styles.task_container}>
            <input
                onChange={(e) => changeStatus({ item: item.itemName, status: e.target.checked })}
                type='checkbox'
                className={styles.task_checkbox}
                checked={checked}>
            </input>
            <span className={styles.task_task_name}>{item.itemName}</span>
            <div className={styles.task_trash_icon} onClick={() => deleteItem(item.itemName)}>
                <Trash />
            </div>
        </div>
    )
}

Task.propTypes = {
    setFlag: PropTypes.func,
    setLoading: PropTypes.func,
    item: PropTypes.object
}

Task.defaultProps = {
    item: {}
}

export default Task