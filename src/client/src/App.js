import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Tasks from "./pages/Tasks/Tasks";
import About from "./pages/About/About";
import Statistics from "./pages/Statistics/Statistics";
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <div className="nav-bar">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/about" element={<About />}  />
            <Route path="/tasks" element={<Tasks />}  />
            <Route path="/statistics" element={<Statistics />}  />
            <Route path="/" element={<Tasks />}  />
            <Route path="*" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
