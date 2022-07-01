import React from 'react';
import PropTypes from 'prop-types';
import './Image.css';

export const Image = ({ src, alt, onClick }) => {
	return (
		<img
			src={src}
			className="list-item-delete-button"
			alt={alt}
			onClick={onClick}
		></img>
	);
};

Image.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	onClick: PropTypes.func,
};

Image.defaultProps = {
	src: '',
	alt: '',
	onClick: undefined,
};
