import React from "react";
import "./dataRow.css";

const DataRow = ({ icon, header, content }) => {
  return (
    <div className="data-row-item">
      <div className="data-row-item-title">
        <i className={icon}></i>
        {header}
      </div>
      <div className="data-row-item-value">{content}</div>
    </div>
  );
};

export default DataRow;
