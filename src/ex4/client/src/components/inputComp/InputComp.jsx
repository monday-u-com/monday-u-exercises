import "../../App.css";
import "./InputComp.css";
import React, { useCallback, useRef } from "react";
import ButtonComp from "../buttonComp/ButtonComp";
import plusImg from "../../images/plus.png";

function InputComp({ addItemsAction, dispatchSearchText, searchText }) {
	const inputElement = useRef();

	const addItemHandeler = useCallback(() => {
		addItemsAction(searchText);
		dispatchSearchText("");
		inputElement.current.value = searchText;
	}, [addItemsAction, dispatchSearchText, searchText]);

	const eventListenerForEnter = useCallback(
		(e) => {
			if (searchText && searchText !== "" && e.keyCode === 13) {
				addItemHandeler();
			}
		},
		[searchText, addItemHandeler]
	);

	return (
		<div className="new-task-container">
			<input
				type="text"
				className="task-input"
				placeholder="Write your task here"
				onChange={(e) => {
					dispatchSearchText(e.target.value);
				}}
				onKeyDown={(e) => eventListenerForEnter(e)}
				ref={inputElement}
				value={searchText}
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
