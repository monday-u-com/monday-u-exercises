import React, { useMemo } from "react";
import Header from "../../components/Header/Header";
import "./statistics.css";

const Statistics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status).length;
  const uncompletedTasks = totalTasks - completedTasks;

  const avgTimeToComplete = () => {
    let delta = 0;
    if (completedTasks === 0) return "There are no completed tasks";
    tasks.forEach((task) => {
      if (task.status) {
        const doneDate = new Date(task.doneAt);
        const creationDate = new Date(task.createdAt);
        delta += doneDate - creationDate;
      }
    });
    const deltaInHours = delta / 1000 / 60 / 60;
    const avgInHours = deltaInHours / completedTasks;
    if (avgInHours < 0.5)
      return `Average time to complete: less than 30 minutes`;
    return `Average time to complete: ${avgInHours.toFixed(2)} hours`;
  };

  const avgTimeToCompleteMemo = useMemo(
    () => avgTimeToComplete(),
    [tasks, completedTasks]
  );

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header headline="Statistics" />
        </div>
        <div className="statistics">
          <div className="statistics-item">
            <div className="statistics-item-title">
              <i className="fa-solid fa-list-check"></i>
              Total tasks
            </div>
            <div className="statistics-item-value">{totalTasks}</div>
          </div>
          <div className="statistics-item">
            <div className="statistics-item-title">
              <i className="fa-solid fa-circle-check"></i>
              Completed Tasks
            </div>
            <div className="statistics-item-value">{completedTasks}</div>
          </div>
          <div className="statistics-item">
            <div className="statistics-item-title">
              <i className="fa-solid fa-bars-progress"></i>
              Uncompleted Tasks
            </div>
            <div className="statistics-item-value">{uncompletedTasks}</div>
          </div>
          <div className="statistics-item">
            <div className="statistics-item-title">
              <i className="fa-solid fa-clock"></i>
              Average Task Completion Time
            </div>
            <div className="statistics-item-value">{avgTimeToCompleteMemo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
