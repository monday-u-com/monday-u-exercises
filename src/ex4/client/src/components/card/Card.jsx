import React from 'react';
import './Card.css';

function Card({ width, height, heading, children }) {
  return (
    <div className={"card-container"} style={{ width: width, height: height }} >
      {heading &&
        <p className={"card-heading"}>{heading}</p>
      }
      {children}
    </div>
  )
}

export default Card