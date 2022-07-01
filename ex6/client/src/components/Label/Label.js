import React from 'react';
import PropTypes from 'prop-types';
import './Label.css';

export const Label = ({ label }) => {
	return <label className="list-item-label">{label}</label>;
};

Label.propTypes = {
	label: PropTypes.string,
};

Label.defaultProps = {
	label: '',
};
