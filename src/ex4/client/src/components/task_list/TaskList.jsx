import React, { useEffect, useState } from 'react'
import ItemClient from '../../api/itemClient'
import Task from '../task/Task'
import styles from './TaskList.module.css'

function TaskList({ itemAdded, flag, setFlag, loading, setLoading }) {

  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsFromServer = async () => {
      const client = new ItemClient()
      const newItems = await client.getItems()
      setItems(newItems)
    }
    getItemsFromServer()
  }, [itemAdded])

  return (
    <div className={styles.task_list_container}>
      <ul className={styles.task_list_ul}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <Task loading={loading} setLoading={setLoading} flag={flag} setFlag={setFlag} item={item}></Task>
              <hr ></hr>
            </div>
          )
        })}
      </ul >
    </div>
  )
}

export default TaskList