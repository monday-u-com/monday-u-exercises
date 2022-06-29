import React, { useEffect, useState } from 'react'
import ItemClient from '../../api/itemClient'
import Task from '../task/Task'
import styles from './TaskList.module.css'
import PropTypes from 'prop-types';

function TaskList({ flag, setFlag, loading, setLoading }) {

  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsFromServer = async () => {
      const client = new ItemClient()
      const newItems = await client.getItems()
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
              <Task loading={loading} setLoading={setLoading} flag={flag} setFlag={setFlag} item={item}></Task>
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
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
}

export default TaskList