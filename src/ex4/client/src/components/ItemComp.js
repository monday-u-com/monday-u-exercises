import "../App.css";
import { useState } from "react";
import ButtonComp from "./ButtonComp";
import trashImg from "../images/trash.png";
import plusImg from "../images/plus.png";

function ItemComp({ item, deleteItem, updateItem }) {
	const [isEditElement, setIsEditElement] = useState(false);
	const [itemName, setItemName] = useState(item.itemName);

	return (
		<div className="item-container">
			<input
				type="checkbox"
				onChange={(e) => {
					e.stopPropagation();
					updateItem(item.id, { status: !item.status });
				}}
				checked={item.status}
			></input>
			{isEditElement ? (
				<div>
					<input
						className="clickable"
						onChange={(e) => setItemName(e.target.value)}
						value={itemName}
					/>

					<ButtonComp
						className={"clickable pluse-iconElement"}
						imgSrc={plusImg}
						callback={() => {
							updateItem(item.id, { itemName: itemName });
							setIsEditElement(false);
						}}
						imgClassName={"pluse-icon"}
					/>
				</div>
			) : (
				<div
					className="clickable task-element"
					onClick={() => setIsEditElement(true)}
				>
					{itemName}
					<ButtonComp
						className={"clickable delete-button"}
						imgSrc={trashImg}
						callback={deleteItem}
						imgClassName={"tash-icon"}
					/>
				</div>
			)}
		</div>
	);
}

export default ItemComp;
