import "../App.css";
import ItemComp from "./ItemComp";

function ItemsComp({ deleteItem, updateItem, allItems }) {
	const dismantleAllItems = () => {
		return (
			<div>
				{allItems.map((item) => {
					return (
						<ItemComp
							key={item.id}
							item={item}
							deleteItem={async () => await deleteItem(item.id)}
							updateItem={updateItem}
						/>
					);
				})}
			</div>
		);
	};

	return dismantleAllItems();
}

export default ItemsComp;
