import React, { useEffect, useState } from 'react'
import ItemClient from '../../api/itemClient'
import Task from '../task/Task'
import './TaskList.css'

function TaskList() {

  const [items, setItems] = useState([])

  useEffect(() => {
    const getItemsFromServer = async () => {
      const client = new ItemClient()
      const newItems = await client.getItems()
      setItems(newItems)
    }
    getItemsFromServer()
  }, [])

  return (
    <ul className={"task-list-container"}>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Task name={item.itemName}></Task>
            <hr ></hr>
          </div>
        )
      })}
    </ul >
  )
}

export default TaskList