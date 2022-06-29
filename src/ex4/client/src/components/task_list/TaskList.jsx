import React, { useEffect, useState } from 'react'
import ItemClient from '../../api/itemClient'
import Task from '../task/Task'
import styles from './TaskList.module.css'
import PropTypes from 'prop-types';

function TaskList({ flag, setFlag, setLoading }) {

  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsFromServer = async () => {
      setLoading(true)
      const client = new ItemClient()
      const newItems = await client.getItems()
      setLoading(false)
      setItems(newItems)
    }
    getItemsFromServer()
  }, [flag])

  return (
    <div className={styles.task_list_container}>
      <ul className={styles.task_list_ul}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <Task setLoading={setLoading} setFlag={setFlag} item={item}></Task>
              <hr ></hr>
            </div>
          )
        })}
      </ul >
    </div>
  )
}

TaskList.propTypes = {
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
  setLoading: PropTypes.func,
}

export default TaskList