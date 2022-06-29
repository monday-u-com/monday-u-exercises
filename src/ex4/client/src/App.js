import "./App.css";
import { useEffect, useState, useCallback } from "react";
import InputComp from "./components/InputComp";
import ItemsComp from "./components/ItemsComp";
import ButtonComp from "./components/ButtonComp";
import NumOfItemsComp from "./components/NumOfItemsComp";
import clearIcon from "./images/clearIcon.png";
import itemClient from "./item_client";

function App() {
	const [allItems, setAllItems] = useState([]);

	const addItem = useCallback(async (value) => {
		const result = await itemClient.addItem({ itemName: value });
		if (result.status !== 201) {
			alert("this item alredy exist.");
		} else {
			setAllItems(result.items);
		}
	}, []);

	const updateItem = useCallback(async (itemId, item) => {
		debugger;
		const result = await itemClient.updateItem(itemId, item);
		if (result.status !== 201) {
			alert("Update failed");
		}
		setAllItems(result.items);
	}, []);

	const deleteItem = useCallback(async (itemId) => {
		const result = await itemClient.deleteItem(itemId);
		if (result.status !== 200) {
			alert("Deletion failed");
		}
		setAllItems(result.items);
	}, []);

	const clearAllItems = useCallback(async () => {
		const result = await itemClient.clearAll();
		if (result.status !== 200 && result.items > 0) {
			alert("there is nothing to delete");
		}
		setAllItems([]);
	}, []);

	useEffect(() => {
		const getAllItems = async () => {
			const result = await itemClient.getAllItems();
			if (result.status !== 200 && result.items.length > 0) {
				alert("Something went wrong please try to refresh the page");
			} else {
				setAllItems(result.items);
			}
		};
		getAllItems();
	}, []);

	return (
		<div className="container">
			<h1>Sunday.com</h1>
			<InputComp addItem={addItem} />
			<NumOfItemsComp numOfItems={allItems.length} />
			<ItemsComp
				allItems={allItems}
				deleteItem={deleteItem}
				updateItem={updateItem}
			/>
			<ButtonComp
				imgSrc={clearIcon}
				imgClassName={"clear-all"}
				alt={"clear All data"}
				callback={clearAllItems}
			/>
		</div>
	);
}

export default App;
