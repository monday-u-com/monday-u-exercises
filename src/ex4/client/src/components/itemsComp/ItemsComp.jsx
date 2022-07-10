import { useCallback } from "react";
import "../../App.css";
import ItemComp from "../itemComp/ItemComp";

function ItemsComp({ items, dispatchDeleteItem, dispachUpdateItem }) {
	const renderItems = useCallback(() => {
		return (
			<div>
				{items.map((item) => {
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
	}, [dispachUpdateItem, dispatchDeleteItem, items]);

	return renderItems();
}

export default ItemsComp;
