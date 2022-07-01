import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

export const Input = ({ placeholder, value, onChange }) => {
	return (
		<input
			type="text"
			className="list-item-input"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

Input.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
