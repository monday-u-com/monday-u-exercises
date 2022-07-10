import "../../App.css";
import "./itemComp.css";
import { useCallback, useState } from "react";
import ButtonComp from "../buttonComp/ButtonComp";
import { Checkbox } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import trashImg from "../../images/trash.png";
import plusImg from "../../images/plus.png";
import backArrow from "../../images/backArrow.png";
import { useMemo } from "react";

function ItemComp({ item, deleteItem, updateItem, dispachUpdateItem }) {
	const [isEditElement, setIsEditElement] = useState(false);
	const [newItem, setNewItem] = useState(item);

	const editInputAndButton = useCallback(() => {
		return (
			<div>
				<input
					className="clickable, task-small-input"
					onChange={(e) => setNewItem({ ...item, itemName: e.target.value })}
					placeholder={item.itemName}
				/>
				<ButtonComp
					className={"clickable pluse-icon-element"}
					imgSrc={backArrow}
					onClick={() => {
						setIsEditElement(false);
					}}
					imgClassName={"pluse-icon"}
				/>

				<ButtonComp
					className={"clickable pluse-icon-element"}
					imgSrc={plusImg}
					onClick={async () => {
						setIsEditElement(false);
						await dispachUpdateItem(newItem);
					}}
					imgClassName={"pluse-icon"}
				/>
			</div>
		);
	}, [dispachUpdateItem, item, newItem]);

	const taskElement = useMemo(() => {
		return (
			<div
				className="clickable task-element"
				onClick={() => setIsEditElement(true)}
			>
				{item.itemName}
				<ButtonComp
					className={"clickable delete-button"}
					imgSrc={trashImg}
					onClick={deleteItem}
					imgClassName={"tash-icon"}
				/>
			</div>
		);
	}, [deleteItem, item.itemName]);

	const checkbox = useMemo(() => {
		return (
			<Checkbox
				className="checkbox"
				onChange={async (e) => {
					e.stopPropagation();
					setNewItem({ ...newItem, status: !item.status });
					await dispachUpdateItem({ ...newItem, status: !item.status });
				}}
				checked={item.status}
			/>
		);
	}, [dispachUpdateItem, item.status, newItem]);

	const bulidItem = useMemo(() => {
		return (
			<div className="item-container">
				{checkbox}
				{isEditElement ? editInputAndButton() : taskElement}
			</div>
		);
	}, [checkbox, editInputAndButton, isEditElement, taskElement]);

	return bulidItem;
}

export default ItemComp;
