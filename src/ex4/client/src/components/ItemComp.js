import "../App.css";
import "../style/itemComp.css";
import { useState } from "react";
import ButtonComp from "./ButtonComp";
import Checkbox from "monday-ui-react-core/dist/Checkbox";
import "monday-ui-react-core/dist/main.css";
import trashImg from "../images/trash.png";
import plusImg from "../images/plus.png";
import backArrow from "../images/backArrow.png";

function ItemComp({ item, deleteItem, updateItem }) {
	const [isEditElement, setIsEditElement] = useState(false);
	const [itemName, setItemName] = useState(item.itemName);

	const editInputAndButton = () => {
		return (
			<div>
				<input
					className="clickable, task-small-input"
					onChange={(e) => setItemName(e.target.value)}
					value={itemName}
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
						await updateItem({ itemName: itemName }, item.id);
					}}
					imgClassName={"pluse-icon"}
				/>
			</div>
		);
	};

	const taskElement = () => {
		return (
			<div
				className="clickable task-element"
				onClick={() => setIsEditElement(true)}
			>
				{itemName}
				<ButtonComp
					className={"clickable delete-button"}
					imgSrc={trashImg}
					onClick={deleteItem}
					imgClassName={"tash-icon"}
				/>
			</div>
		);
	};

	const checkbox = () => {
		return (
			<Checkbox
				className="checkbox"
				onChange={async (e) => {
					e.stopPropagation();
					await updateItem({ status: !item.status }, item.id);
				}}
				checked={item.status}
			/>
		);
	};

	const bulidItem = () => {
		return (
			<div className="item-container">
				{checkbox()}
				{isEditElement ? editInputAndButton() : taskElement()}
			</div>
		);
	};

	return bulidItem();
}

export default ItemComp;
