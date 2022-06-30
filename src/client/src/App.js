import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ItemClient from "./services/taskService";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./pages/Tasks/Tasks";
import About from "./pages/About/About";
import Statistics from "./pages/Statistics/Statistics";

import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const taskService = new ItemClient();

  const compare = (a, b) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    taskService.fetchTasks().then((tasks) => {
      setTasks(tasks.sort(compare));
    });
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/about" element={<About />} exact />
            <Route
              path="/tasks"
              element={
                <Tasks
                  tasks={tasks}
                  setTasks={setTasks}
                  taskService={taskService}
                />
              }
            />
            <Route
              path="/statistics"
              element={<Statistics tasks={tasks} exact />}
            />
            <Route
              path="*"
              element={
                <Tasks
                  tasks={tasks}
                  setTasks={setTasks}
                  taskService={taskService}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
