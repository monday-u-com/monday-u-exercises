import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useItem } from '../../hooks/useItem';
import './ListControls.css';

export const ListControls = ({ renderItems }) => {
	const { addItem } = useItem();
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		renderItems();
	}, [inputValue, renderItems]);

	const handleItem = async () => {
		await addItem(inputValue);
		await renderItems();

		setInputValue('');
	};

	return (
		<div className="list-controls">
			<Input
				placeholder={'Add your new todo'}
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<Button label={'+'} onClick={handleItem}></Button>
		</div>
	);
};

ListControls.propTypes = {
	renderItems: PropTypes.func,
};

ListControls.defaultProps = {
	renderItems: undefined,
};
