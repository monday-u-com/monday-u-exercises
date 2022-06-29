import React from "react"
import "./style.css"
export const Home = () => {
  return (
    <div class="app-container">
      <div class="list-container">
        <h1 class="app-name">Todo App</h1>
        <div class="list-controls">
          <input
            type="text"
            id="list-item-input"
            placeholder="Add your new todo"
          />
          <button type="button" id="list-item-submit">
            +
          </button>
        </div>
        <ul id="list"></ul>
      </div>
    </div>
  )
}
