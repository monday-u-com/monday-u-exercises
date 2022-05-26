class listManager {
	constructor() {
		this.listArray = [];
	}

	add(newTodo) {
		this.listArray.push(newTodo);
		console.log(this.listArray);
	}
}


