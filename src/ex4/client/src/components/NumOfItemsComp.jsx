import "../style/NumOfItemsComp.css";

function NumOfItemsComp({ numOfItems }) {
	const numOfItemsElement = () => {
		return <span className="amount-tasks">number of tasks: {numOfItems}</span>;
	};
	return numOfItemsElement();
}

export default NumOfItemsComp;
