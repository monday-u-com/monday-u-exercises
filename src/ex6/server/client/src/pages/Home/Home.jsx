import React, { useEffect, useState } from "react"
import { AddTask } from "../../components/AddTask/AddTask"
import "./style.css"
export const Home = () => {
  return (
    <div className="app-container">
      <div className="list-container">
        <h1 className="app-name">Todo App</h1>
        <AddTask />
        <ul id="list"></ul>
      </div>
    </div>
  )
}
