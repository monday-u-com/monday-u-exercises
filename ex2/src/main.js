class Main {
    constructor() {}
    init() {
        const submitButton = domManager.getElement("addTask-btn");
        submitButton.addEventListener("click", (event) => {
            let input = domManager.getElement("list-item-input").value;
            event.preventDefault();
            // check if number
            if (/^[0-9]+$/.test(input)) {
                pokemonClient.getPokemon(input).then((pokemon) => {
                    let item = pokemon.endsWith("was not found") ?
                        pokemon // error handling
                        :
                        `catch ${pokemon}`; // real pokemon
                    this.addAndRenderItem(item);
                });
            }
            // check if comma separated list of IDs
            else if (/^[0-9, ]+$/.test(input)) {
                pokemonClient
                    .getAllPokemons(input.split(",").map((e) => e.trim()))
                    .then((pokemons) => {
                        // error handling
                        if (typeof pokemons === "string") {
                            this.addAndRenderItem(pokemons);
                        }
                        // real pokemons
                        else {
                            setTimeout(() => {
                                pokemons.forEach((pokemon) => {
                                    if (pokemon !== undefined)
                                        this.addAndRenderItem(`catch ${pokemon}`);
                                });
                            }, 50);
                        }
                    });
            }
            // regular tasks
            else {
                this.addAndRenderItem(input);
            }
            itemManager.handleNoTasks();
            // reset current task input
            domManager.getElement("list-item-input").value = "";
        });

        const clearAllButton = domManager.getElement("list-item-clear");
        clearAllButton.addEventListener("click", () => {
            itemManager.removeAllTasks();
            domManager.render(itemManager.tasks);
            itemManager.handleNoTasks();
        });
    }

    addAndRenderItem(input) {
        itemManager.addTask(input);
        domManager.render(itemManager.tasks);
    }
}

const main = new Main();
const itemManager = new ItemManager();
const domManager = new DomManager();
const pokemonClient = new PokemonClient();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});