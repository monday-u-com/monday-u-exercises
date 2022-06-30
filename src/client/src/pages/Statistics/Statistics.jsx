import React, { useMemo } from "react";
import Header from "../../components/Header/Header";
import DataRow from "../../components/DataRow/DataRow";
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
          <DataRow
            icon="fas fa-tasks"
            header="Total tasks"
            content={totalTasks}
          />
          <DataRow
            icon="fas fa-check"
            header="Completed tasks"
            content={completedTasks}
          />
          <DataRow
            icon="fas fa-times"
            header="Uncompleted tasks"
            content={uncompletedTasks}
          />
          <DataRow
            icon="fas fa-clock"
            header="Average time to complete"
            content={avgTimeToCompleteMemo}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
