import React, { useEffect, useState } from 'react'
import ItemClient from '../../api/itemClient'
import Task from '../task/Task'
import './TaskList.css'

function TaskList({ itemAdded, flag, setFlag }) {

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
    <div className={"task-list-container"}>
      <ul className={"task-list-ul"}>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <Task flag={flag} setFlag={setFlag} name={item.itemName}></Task>
              <hr ></hr>
            </div>
          )
        })}
      </ul >
    </div>
  )
}

export default TaskList