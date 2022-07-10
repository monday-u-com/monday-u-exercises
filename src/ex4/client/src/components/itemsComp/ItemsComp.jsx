import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import "../../App.css";
import ItemComp from "../itemComp/ItemComp";

function ItemsComp({
	items = [],
	dispatchDeleteItem,
	dispachUpdateItem,
	searchText,
}) {
	const [filteredItems, setFilteredItems] = useState(items);

	useEffect(() => {
		if (searchText) {
			const filteredItems = items.filter((item) =>
				item.itemName.includes(searchText)
			);
			setFilteredItems(filteredItems);
		} else {
			setFilteredItems(items);
		}
	}, [items, searchText]);
	const renderItems = useCallback(() => {
		return (
			<div>
				{filteredItems.map((item) => {
					return (
						<ItemComp
							key={item.id}
							item={item}
							deleteItem={async () => {
								await dispatchDeleteItem(
									item.id,
									item.pokedexId ? item.pokedexId.toString() : item.itemName
								);
							}}
							dispachUpdateItem={dispachUpdateItem}
						/>
					);
				})}
			</div>
		);
	}, [dispachUpdateItem, dispatchDeleteItem, filteredItems]);

	return renderItems();
}

export default ItemsComp;
