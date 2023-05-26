import "./NumOfItemsComp.css";

function NumOfItemsComp({ itemsLength }) {
	const numOfItemsElement = () => {
		return <span className="amount-tasks">number of tasks: {itemsLength}</span>;
	};
	return numOfItemsElement();
}

export default NumOfItemsComp;
