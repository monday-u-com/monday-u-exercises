import React from "react";

const StatusFilter = ({ filter, setFilter }) => {
  return (
    <div className="select">
      <select
        name="tasks"
        className="filter-tasks filter-dropdown"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </div>
  );
};

export default StatusFilter;
