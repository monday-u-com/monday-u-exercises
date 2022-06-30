import "./App.css";
import { useEffect, useState, useCallback } from "react";
import ReactLoading from "react-loading";
import InputComp from "./components/InputComp";
import ItemsComp from "./components/ItemsComp";
import ButtonComp from "./components/ButtonComp";
import NumOfItemsComp from "./components/NumOfItemsComp";
import clearIcon from "./images/clearIcon.png";
import itemClient from "./item_client";

function App() {
	const [allItems, setAllItems] = useState([]);
	const [isEmptyState, setIsEmptyState] = useState(true);
	const [isloading, setIsLoading] = useState(false);

	const addItem = useCallback(async (value) => {
		setIsLoading(true);
		const res = await itemClient.addItem({ itemName: value });
		setIsLoading(false);
		setIsEmptyState(false);
		if (!res.isResOk) {
			alert("this item alredy exist.");
		} else {
			setAllItems(res.items);
		}
	}, []);

	const updateItem = useCallback(async (item, itemId) => {
		const res = await itemClient.updateItem(item, itemId);
		if (!res.isResOk) {
			alert("Update failed");
		}
		setAllItems(res.items);
	}, []);

	const deleteItem = useCallback(async (itemId) => {
		const res = await itemClient.deleteItem(itemId);
		if (!res.isResOk) {
			alert("Deletion failed");
		}
		setAllItems(res.items);
		setIsEmptyState(res.items.length === 0);
	}, []);

	const clearAllItems = useCallback(async () => {
		const isResOk = await itemClient.clearAll();
		if (!isResOk) {
			alert("there is nothing to delete");
		}
		setIsEmptyState(true);
		setAllItems([]);
	}, []);

	useEffect(() => {
		const getAllItems = async () => {
			const res = await itemClient.getAllItems();
			if (res.isResOk) {
				setAllItems(res.items);
				setIsEmptyState(res.items.length === 0);
			} else {
				alert("Something went wrong please try to refresh the page");
			}
		};
		getAllItems();
	}, []);

	const staticComps = () => {
		return (
			<div className="margin-bottom-element">
				<h1>Sunday.com</h1>
				<InputComp addItem={addItem} />
				<NumOfItemsComp numOfItems={allItems.length} />
			</div>
		);
	};

	const emptyState = () => {
		return <span>What is your next task?</span>;
	};

	const renderListOfItems = () => {
		return (
			<div>
				<ItemsComp
					allItems={allItems}
					deleteItem={deleteItem}
					updateItem={updateItem}
				/>
				<ButtonComp
					imgSrc={clearIcon}
					imgClassName={"clear-all"}
					alt={"clear All data"}
					onClick={clearAllItems}
				/>
			</div>
		);
	};

	const loader = () => {
		return (
			<ReactLoading
				type="bubbles"
				color="rgb(190, 59, 230)"
				height={"20%"}
				width={"20%"}
			/>
		);
	};

	const bulidPage = () => {
		return (
			<div className="container">
				{staticComps()}
				{isloading
					? loader()
					: isEmptyState
					? emptyState()
					: renderListOfItems()}
			</div>
		);
	};

	return bulidPage();
}

export default App;
