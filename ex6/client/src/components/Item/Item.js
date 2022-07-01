import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../Checkbox/Checkbox';
import { Label } from '../Label/Label';
import { Image } from '../Image/Image';
import delete_icon from '../../images/delete_icon.svg';

import './Item.css';

export const Item = ({ item, handleItemDelete, HandleItemUpdate }) => {
	return (
		<li className="list-item">
			<Checkbox isChecked={item.status} onChange={HandleItemUpdate} />
			<Label
				label={
					item.status === true
						? `${item.ItemName} (Done: ${new Date(
								item.updatedAt
						  ).toLocaleString()})`
						: item.ItemName
				}
			/>

			<Image src={delete_icon} onClick={handleItemDelete} />
		</li>
	);
};

Item.propTypes = {
	item: PropTypes.object.isRequired,
	handleItemDelete: PropTypes.func,
	HandleItemUpdate: PropTypes.func,
};

Item.defaultProps = {
	item: {},
	handleItemDelete: undefined,
	HandleItemUpdate: undefined,
};
