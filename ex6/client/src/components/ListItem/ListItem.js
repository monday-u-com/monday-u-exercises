import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Item } from '../Item/Item';
import { useItem } from '../../hooks/useItem';
import './ListItem.css';

export const ListItem = ({ itemsList, renderItems }) => {
	const { deleteItem, updateItem } = useItem();
	console.log(itemsList);
	useEffect(() => {
		renderItems();
	}, [renderItems]);

	const handleItemDelete = async (item) => {
		await deleteItem(item.ItemName);
		await renderItems();
	};

	const HandleItemUpdate = async (item) => {
		item.status = !item.status;
		await renderItems();
	};

	return (
		<ul className="list">
			{itemsList.map((item, index) => {
				return (
					<Item
						key={index}
						item={item}
						handleItemDelete={() => handleItemDelete(item)}
					/>
				);
			})}
		</ul>
	);
};

ListItem.propTypes = {
	itemsList: PropTypes.array,
	renderItems: PropTypes.func,
};

ListItem.defaultProps = {
	itemsList: [],
	renderItems: undefined,
};
