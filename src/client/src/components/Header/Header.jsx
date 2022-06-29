import React from "react";
import "./header.css";

const Header = ({headline}) => {
  return (
    <div className="header">
      <h1>{headline}</h1>
    </div>
  );
};

export default Header;
