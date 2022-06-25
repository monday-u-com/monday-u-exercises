import React from "react";
import "./emptyListNote.css";

const EmptyListNote = () => {
  return (
    <div className="empty-list-note">
      <i className="fa-regular fa-keyboard"></i>
      <span>Waiting for you to add your tasks</span>
    </div>
  );
};

export default EmptyListNote;
