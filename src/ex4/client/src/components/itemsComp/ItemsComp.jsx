import { isInteger } from "lodash";
import { useEffect, useState } from "react";
import "../../App.css";
import ItemComp from "../itemComp/ItemComp";

function ItemsComp({ items, deleteItemAction, updateItemAction, searchText }) {
	const [filteredItems, setFilteredItems] = useState(items);

	useEffect(() => {
		if (searchText && !isInteger(parseInt(searchText))) {
			const filteredItems = items.filter((item) =>
				item.itemName.includes(searchText)
			);
			setFilteredItems(filteredItems);
		} else if (isInteger(parseInt(searchText))) {
			const filteredItems = items.filter(
				(item) => item.pokedexId === parseInt(searchText)
			);
			setFilteredItems(filteredItems);
		} else {
			setFilteredItems(items);
		}
	}, [items, searchText]);

	return (
		<div>
			{filteredItems.map((item) => {
				return (
					<ItemComp
						key={item.id}
						item={item}
						deleteItemAction={deleteItemAction}
						updateItemAction={updateItemAction}
					/>
				);
			})}
		</div>
	);
}

export default ItemsComp;
