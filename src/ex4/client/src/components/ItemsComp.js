import "../App.css";
import ItemComp from "./ItemComp";

function ItemsComp({ deleteItem, updateItem, allItems }) {
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
}

export default ItemsComp;
