// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const getAllTasks = async () => {
	try {
		const res = await fetch("/tasks");
		if (res.ok) {
			return res.json();
		}
	} catch (err) {
		return err;
	}
};

const addItem = async (item) => {
	try {
		let res = await fetch("/tasks/add", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(item),
		});
		if (res.ok) {
			return res.json();
		} else {
			throw new Error("not created");
		}
	} catch (err) {
		return err;
	}
};

const deleteItem = async (index) => {
	try {
		const res = await fetch(`/tasks/delete/${index}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		if (res.ok) {
			return res.json();
		}
		throw new Error("No items were deleted Something went wrong");
	} catch (err) {
		return err;
	}
};

export { getAllTasks, addItem, deleteItem };
