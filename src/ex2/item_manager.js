class ItemManager {
	constructor() {
		this.itemList = [];
		this.id = 5;
	}
	addListItem(item) {
		this.itemList = [...this.itemList, { id: this.id, value: item }];
		this.id++;
	}
	removeItem(itemId) {
		this.itemList = [...this.itemList.filter((item = item.id !== itemId))];
	}

	pokemon(pokeID) {
		return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
	}
}

export default ItemManager;
