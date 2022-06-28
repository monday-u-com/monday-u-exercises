import { Dropdown } from "monday-ui-react-core";
import React from "react";

const StatusFilter = ({ filter, setFilter }) => {
  return (
    <Dropdown
      className="dropdown-stories-styles_spacing"
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
