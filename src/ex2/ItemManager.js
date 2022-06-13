import { PokemonClient } from './PokemonClient.js';

export class ItemManager {
  constructor() {
    this.todos = [];
  }

  addItem(item) {
    const id = Date.now();
    const todo = {
      id,
      task: item,
    };
    this.todos.push(todo);
    return todo;
  }

  removeItem(id) {
    const filteredTodo = this.todos.filter((todo) => todo.id !== parseInt(id));
    this.todos = [...filteredTodo];
  }

  async addPokemons(ids) {
    const pokemonClient = new PokemonClient();
    const result = await pokemonClient.fetchPokemons(ids);
    result.forEach((pokemon) => {
      if (!this.todos.find((p) => p.id === pokemon.id)) {
        this.todos.push(pokemon);
      }
    });
  }
}