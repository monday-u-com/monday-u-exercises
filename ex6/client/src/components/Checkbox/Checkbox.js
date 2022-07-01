import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

export const Checkbox = ({ isChecked, onChange }) => {
	return (
		<input
			type="checkbox"
			className="list-item-checkbox"
			checked={isChecked}
			onChange={onChange}
		></input>
	);
};

Checkbox.propTypes = {
	isChecked: PropTypes.bool,
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	isChecked: false,
	onChange: undefined,
};
