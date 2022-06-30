import { Dropdown } from "monday-ui-react-core";
import React from "react";

const StatusFilter = ({ filter, setFilter }) => {
  return (
    <Dropdown
      className="selectDrop"
      onOptionSelect={(e) => setFilter(e.value)}
      options={[
        {
          label: "All",
          value: "all",
        },
        {
          label: "Completed",
          value: "completed",
        },
        {
          label: "Uncompleted",
          value: "uncompleted",
        },
      ]}
      placeholder="filter"
    />
  );
};

export default StatusFilter;
