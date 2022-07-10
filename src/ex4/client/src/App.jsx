import "./App.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import Toast from "monday-ui-react-core/dist/Toast";
import ReactLoading from "react-loading";
import InputComp from "./components/InputComp";
import ItemsComp from "./components/ItemsComp";
import ButtonComp from "./components/ButtonComp";
import NumOfItemsComp from "./components/NumOfItemsComp";
import clearIcon from "./images/clearIcon.png";
import itemClient from "./item_client";

function App() {
	const [allItems, setAllItems] = useState([]);
	const [lastPerformance, setLastPerformance] = useState({
		item: {},
		undoAction: "",
		undoMessage: "",
	});
	const [isEmptyState, setIsEmptyState] = useState(true);
	const [isloading, setIsLoading] = useState(false);
	const [toast, setToast] = useState(false);
	const [timeOutId, setTimeOutId] = useState(NaN);

	const handleToastOpen = useCallback(() => {
		let timeOut;
		clearTimeout(timeOutId);
		setToast(true);
		timeOut = setTimeout(() => {
			setToast(false);
		}, 5000);
		setTimeOutId(timeOut);
	}, [timeOutId]);

	const addItem = useCallback(
		async (value) => {
			setIsLoading(true);
			const res = await itemClient.addItem({ itemName: value });
			setIsLoading(false);
			setIsEmptyState(false);
			if (!res.isResOk) {
				alert("this item alredy exist.");
			} else {
				setAllItems(res.items);
				setLastPerformance({
					item: res.items.pop(),
					undoAction: "delete",
					undoMessage: "Successfully created",
				});
				handleToastOpen();
			}
		},
		[handleToastOpen]
	);

	const updateItem = useCallback(
		async (item, itemId) => {
			const res = await itemClient.updateItem(item, itemId);
			if (!res.isResOk) {
				alert("Update failed");
			}
			const oldItem = allItems.filter((task) => task.id === itemId);

			setLastPerformance({
				item: oldItem[0],
				undoAction: "update",
				undoMessage: "successfully updated",
			});
			setAllItems(res.items);
			handleToastOpen();
		},
		[allItems, handleToastOpen]
	);

	const deleteItem = useCallback(
		async (itemId) => {
			const res = await itemClient.deleteItem(itemId);
			if (!res.isResOk) {
				alert("Deletion failed");
			}
			const deletedItem = allItems.filter((task) => task.id === itemId);
			const LastPerformanceItem = deletedItem[0].pokedexId
				? deletedItem[0].pokedexId.toString()
				: deletedItem[0].itemName;
			setLastPerformance({
				item: LastPerformanceItem,
				undoAction: "add",
				undoMessage: "Deletion succeeded",
			});
			setAllItems(res.items);
			setIsEmptyState(res.items.length === 0);
			handleToastOpen();
		},
		[allItems, handleToastOpen]
	);

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
	}, [allItems, setAllItems]);

	const handleToastButton = useCallback(async () => {
		if (lastPerformance.undoAction === "delete") {
			await deleteItem(lastPerformance.item.id);
		} else if (lastPerformance.undoAction === "add") {
			await addItem(lastPerformance.item);
		} else if (lastPerformance.undoAction === "update") {
			await updateItem(lastPerformance.item, lastPerformance.item.id);
		}
		setToast(false);
	}, [lastPerformance, deleteItem, addItem, updateItem]);

	const toastActions = useMemo(
		() => [
			{
				type: Toast.actionTypes.BUTTON,
				content: "Undo",
				onClick: handleToastButton,
			},
		],
		[handleToastButton]
	);

	const staticComps = () => {
		return (
			<div className="margin-bottom-element">
				<h1>Sunday.com</h1>
				<InputComp addItem={addItem} />
				<NumOfItemsComp numOfItems={allItems.length} />
				<Toast
					open={toast}
					type={Toast.types.POSITIVE}
					closeable={false}
					actions={toastActions}
					onClick={() => handleToastButton()}
				>
					{lastPerformance.undoMessage}
				</Toast>
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
