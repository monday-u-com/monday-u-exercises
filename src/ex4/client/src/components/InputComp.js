import "../App.css";
import "../style/InputComp.css";
import React, { useCallback, useRef, useState } from "react";
import ButtonComp from "./ButtonComp";
import plusImg from "../images/plus.png";
import {} from "../item_client";

function InputComp({ addItem }) {
	const [inputValue, setInputValue] = useState("");
	const inputElement = useRef();

	const addItemHandeler = useCallback(() => {
		addItem(inputValue);
		inputElement.current.value = "";
		inputElement.current.focus();
	}, [addItem, inputValue, inputElement]);

	const eventListenerForEnter = useCallback(
		(e) => {
			if (inputValue && e.keyCode === 13) {
				addItemHandeler();
			}
		},
		[inputValue, addItemHandeler]
	);

	return (
		<div className="new-task-container">
			<input
				type="text"
				className="task-input"
				placeholder="Write your task here"
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={(e) => eventListenerForEnter(e)}
				ref={inputElement}
			></input>
			<ButtonComp
				className={"clickable pluse-icon-element"}
				imgSrc={plusImg}
				imgClassName={"pluse-icon"}
				alt={"add an item to the items list"}
				onClick={() => addItemHandeler()}
			/>
		</div>
	);
}

export default InputComp;
