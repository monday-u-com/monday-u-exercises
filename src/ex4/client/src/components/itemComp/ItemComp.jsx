import "../../App.css";
import "./itemComp.css";
import { useState } from "react";
import ButtonComp from "../buttonComp/ButtonComp";
import { Checkbox } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import trashImg from "../../images/trash.png";
import plusImg from "../../images/plus.png";
import backArrow from "../../images/backArrow.png";

function ItemComp({ item, deleteItemAction, updateItemAction }) {
	const [isEditElement, setIsEditElement] = useState(false);
	const [newItem, setNewItem] = useState(item);

	return (
		<div className="item-container">
			<Checkbox
				className="checkbox"
				onChange={async (e) => {
					e.stopPropagation();
					setNewItem({ ...newItem, status: !item.status });
					updateItemAction({ ...newItem, status: !item.status });
				}}
				checked={item.status}
			/>
			{isEditElement ? (
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
						onClick={() => {
							setIsEditElement(false);
							updateItemAction(newItem);
						}}
						imgClassName={"pluse-icon"}
					/>
				</div>
			) : (
				<div
					className="clickable task-element"
					onClick={() => setIsEditElement(true)}
				>
					{item.itemName}
					<ButtonComp
						className={"clickable delete-button"}
						imgSrc={trashImg}
						onClick={() => {
							deleteItemAction(
								item.id,
								item.pokedexId ? item.pokedexId.toString() : item.itemName
							);
						}}
						imgClassName={"tash-icon"}
					/>
				</div>
			)}
		</div>
	);
}

export default ItemComp;
