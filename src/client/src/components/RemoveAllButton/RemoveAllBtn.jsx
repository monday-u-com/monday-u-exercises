import React from "react";
import "./reomoveAllBtn.css";

const RemoveAllBtn = ({ handleRemoveAll }) => {
  return (
    <div className="remove-all">
      <button
        className="btn remove-all-btn"
        type="button"
        onClick={handleRemoveAll}
      >
        Remove all
      </button>
    </div>
  );
};

export default RemoveAllBtn;
