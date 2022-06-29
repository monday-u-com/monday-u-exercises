import React, { useEffect, useState } from "react"
import "./style.css"
import { ItemClient } from "./item_client"
import deleteIcon from "./images/delete_icon.svg"

export const AddTask = () => {
  const itemClient = new ItemClient()
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await itemClient.getItems()
        setTasks(result)
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  console.log("tasks", tasks)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await itemClient.postItem(task)
      setTasks([...tasks, result])
      setTask("")
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  const deleteItem = async (id) => {
    setIsLoading(true)
    try {
      const result = await itemClient.deleteItem(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  const doneItem = async (id) => {
    setIsLoading(true)
    try {
      const result = await itemClient.toggleDone(id)
      setTasks(tasks.map((task) => (task.id === id ? result : task)))
    } catch (error) {
      setError(error)
    }
    setIsLoading(false)
  }

  const _createItemTextElement = (item) => {
    return (
      <div className="item-text">
        <p>{item.text}</p>
      </div>
    )
  }

  const _createDeleteButton = (item) => {
    return (
      <div className="delete-button">
        <img
          onClick={() => deleteItem(item.id)}
          src={deleteIcon}
          alt="delete"
        />
      </div>
    )
  }

  // const _createDoneButton = (item) => {
  //   return (
  //     <div className="done-button">
  //       <button onClick={() => doneItem(item.id)}>Done</button>
  //     </div>
  //   )
  // }
  return (
    <div className="container">
      <div className="list-controls">
        <input
          type="text"
          id="list-item-input"
          placeholder="Add your new todo"
        />
        <button onClick={handleSubmit} type="button" id="list-item-submit">
          +
        </button>
      </div>
      <ul id="list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="list-item">
              {/* <div className="list-item-checkbox">
                {_createDoneButton(task)}
              </div> */}
              <div className="list-item-text">
                {_createItemTextElement(task)}
              </div>
              <div className="list-item-delete-button">
                {_createDeleteButton(task)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
