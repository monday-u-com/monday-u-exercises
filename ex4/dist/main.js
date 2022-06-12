// // const itemManager = new ItemManager();
// // const pokemonClient = new PokemonClient();
// // const domManager = new DomManager();
// class Main {
// 	constructor() {}
// 	init() {
// 		const submitButton = domManager.getElement('addTask-btn');
// 		submitButton.addEventListener('click', (event) => {
// 			let input = domManager.getElement('list-item-input').value;
// 			event.preventDefault();
// 			if (/^[0-9, ]+$/.test(input)) {
// 				const ids = input.split(',');
// 				ids.forEach((id) => {
// 					pokemonClient.getPokemon(id).then((pokemon) => {
// 						let item = pokemon.endsWith('was not found')
// 							? pokemon // error handling
// 							: `catch ${pokemon}`; // real pokemon
// 						console.log(item);
// 						this.addAndRenderItem(item).then(
// 							itemManager.handleNoTasks()
// 						);
// 					});
// 				});
// 			}
// 			// regular tasks
// 			else {
// 				this.addAndRenderItem(input);
// 				itemManager.handleNoTasks();
// 			}

// 			// reset current task input
// 			domManager.getElement('list-item-input').value = '';
// 		});

// 		const clearAllButton = domManager.getElement('list-item-clear');
// 		clearAllButton.addEventListener('click', () => {
// 			itemManager.removeAllTasks();
// 			domManager.render(itemManager.tasks);
// 			itemManager.handleNoTasks();
// 		});
// 	}

// 	async addAndRenderItem(input) {
// 		itemManager.addTask(input);
// 		domManager.render(itemManager.tasks);
// 	}
// }
// const main = new Main();

// document.addEventListener('DOMContentLoaded', function () {
// 	main.init();
// });
