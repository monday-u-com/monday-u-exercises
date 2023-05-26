import "../../App.css";
import { useEffect, useState, useCallback, useMemo } from "react";
import Toast from "monday-ui-react-core/dist/Toast";
import ReactLoading from "react-loading";
import InputCompConnector from "../inputComp/InputCompConnector";
import ItemsCompConnector from "../itemsComp/ItemsCompConnector";
import ButtonComp from "../buttonComp/ButtonComp";
import clearIcon from "../../images/clearIcon.png";
import NumOfItemsCompConnector from "../numOfItemsComp/NumOfItemsCompConnector";

function TodoListComp({
	items,
	isLoading,
	lastAction,
	setAllItemsAction,
	clearAllAction,
	dispatchIsLoading,
	dispatchUndoLastAction,
}) {
	const [toast, setToast] = useState(false);

	useEffect(() => {
		setToast(true);
		let timeOut = setTimeout(() => {
			setToast(false);
		}, 5000);
		return () => clearTimeout(timeOut);
	}, [lastAction]);

	useEffect(() => {
		const getAllItems = () => {
			setAllItemsAction();
			dispatchIsLoading(false);
		};
		getAllItems();
	}, [setAllItemsAction, items.length, dispatchIsLoading]);

	const handleToastButton = useCallback(() => {
		dispatchUndoLastAction(lastAction);
	}, [dispatchUndoLastAction, lastAction]);

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

	return (
		<div className="container">
			<div className="margin-bottom-element">
				<h1>Sunday.com</h1>
				<InputCompConnector />
				<NumOfItemsCompConnector />
				{lastAction && (
					<Toast
						open={toast}
						type={Toast.types.POSITIVE}
						closeable={false}
						actions={toastActions}
						onClick={() => {
							handleToastButton();
						}}
					>
						{lastAction.actionMessage}
					</Toast>
				)}
			</div>
			{isLoading ? (
				<ReactLoading
					type="bubbles"
					color="rgb(190, 59, 230)"
					height={"20%"}
					width={"20%"}
				/>
			) : items.length === 0 ? (
				<span>What is your next task?</span>
			) : (
				<div>
					<ItemsCompConnector />
					<ButtonComp
						imgSrc={clearIcon}
						imgClassName={"clear-all"}
						alt={"clear All data"}
						onClick={clearAllAction}
					/>
				</div>
			)}
		</div>
	);
}

export default TodoListComp;
