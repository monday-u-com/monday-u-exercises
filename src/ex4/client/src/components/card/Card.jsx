import React from 'react';
import styles from './Card.module.css';

function Card({ width, height, heading, children }) {
  return (
    <div className={styles.card_container} style={{ width: width, height: height }} >
      {heading &&
        <p className={styles.card_heading}>{heading}</p>
      }
      {children}
    </div>
  )
}

export default Card