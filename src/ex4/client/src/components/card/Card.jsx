import React from 'react';
import styles from './Card.module.css';
import PropTypes from 'prop-types';

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

Card.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  heading: PropTypes.string,
}
Card.defaultProps = {
  width: '300px',
  height: '300px',
  heading: 'Card'
}

export default Card