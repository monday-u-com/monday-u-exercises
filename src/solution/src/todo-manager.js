import ItemManager from "./item-manager.js";
import FileSystemManager from "./file-system-manager.js";
import chalk from 'chalk';
import art from 'ascii-art';
import fs from 'fs';
import fetch from 'node-fetch';

class TodoManager {
    constructor() {
        this.itemManager = new ItemManager;
        this.fileSystemManager = new FileSystemManager;
    }

    //add
    async addTodo(todo) {
        let todos;
        try {
            todos = await this.itemManager.addItem(todo);
            this.insertTodos(todos);
        } catch (e) {
            console.error(e);
        }
        return this.checkForAddedDuplicatePokemon(todos);
    }

    insertTodos(todos) {
        this.handleErrorItems(todos);
        this.handleTodos(todos);
    }

    handleErrorItems(todos) {
        const notFoundPokemons = todos.filter(item => item.type == 'pokemonNotFound');
        if (!notFoundPokemons.length) {
            return;
        }

        const itemObject = { ...notFoundPokemons[0] };
        if (notFoundPokemons.length > 1) {
            itemObject.type = 'notFoundPokemons';
            itemObject.item = notFoundPokemons.map(({ item }) => item).join(', ');
        }
        this.itemManager.insertItem(
            {
                ...itemObject,
                message: this.handleTodoMessage(itemObject)
            });
    }

    handleTodos(todos) {
        todos
            .filter(item => item.type != 'pokemonExists' && item.type != 'pokemonNotFound')
            .forEach(todo => {
                const itemObject = {
                    type: todo.type,
                    item: todo.item,
                    message: this.handleTodoMessage(todo)
                }
                if (todo.type == 'pokemon') {
                    itemObject.pokemon = todo.pokemon;
                }
                this.itemManager.insertItem(itemObject);
            });
    }

    handleTodoMessage(todo) {
        switch (todo.type) {
            case 'notFoundPokemons': {
                return `Failed to fetch pokemon with this input: ${todo.item}`;
            }
            case 'pokemonNotFound': {
                return `Pokemon with ID ${todo.item} was not found`;
            }
            case 'text': {
                return todo.item;
            }
            case 'pokemon': {
                const { pokemon } = todo;
                return `Catch #${pokemon.id} ${this.capitalizeText(pokemon.name)} the ${pokemon.types.map(p => this.capitalizeText(p.type.name)).join('/')} type pokemon`;
            }
        }
        return todo.item;
    }

    checkForAddedDuplicatePokemon(todos) {
        const duplicatesPokemons = todos.filter(item => item.type == 'pokemonExists');
        const notDuplicatesTodos = todos.filter(item => item.type != 'pokemonExists');
        const todoStatus = {};
        if (todos.length && notDuplicatesTodos.length) {
            todoStatus.todo = 'New todo added successfully';
        }
        if (duplicatesPokemons.length) {
            let content = 'The following pokemons are already exist: \n';
            duplicatesPokemons.forEach(({ pokemon }) => {
                content += `id: ${pokemon.id}, name: ${pokemon.name} \n`;
            });
            todoStatus.duplicates = content;
        }
        return todoStatus;
    }

    render(options) {
        const todoListdata = this.getItems(options);
        todoListdata?.forEach((element) => {
            switch (element.type) {
                case 'notFoundPokemons': {
                    console.log(chalk.gray(element.message));
                    break;
                }
                case 'pokemonNotFound': {
                    console.log(chalk.gray(element.message));
                    break;
                }
                case 'text': {
                    console.log(chalk.yellow(element.message));
                    break;
                }
                case 'pokemon': {
                    console.log(chalk.blue(element.message));
                    break;
                }
            }
        });
    }

    getItems(options) {
        let todoListdata = this.fileSystemManager.getAllItems();
        if (!todoListdata.length) {
            return 'Well done your todo list is empty';
        }

        todoListdata = this.filterTodoList(options.filter, todoListdata);
        todoListdata = this.sortTodoListByOption(options.sort, todoListdata);
        return todoListdata;
    }

    filterTodoList(filter, todoListdata, reversed = false) {
        let atr;
        switch (filter) {
            case 'text':
            case 'pokemon':
                atr = [filter];
                break;

            case 'not-found':
                atr = ['pokemonNotFound', 'notFoundPokemons']
                break;

            case 'all':
            default:
                return reversed ? [] : todoListdata;
        }
        return todoListdata.filter(item => reversed ? !atr.includes(item.type) : atr.includes(item.type));
    }


    sortTodoListByOption(sort, todoListdata) {
        if (sort != 'def') {
            todoListdata?.sort((a, b) => a.message > b.message ? 1 : a.message < b.message ? -1 : 0);
            if (sort === 'desc') {
                todoListdata?.reverse();
            }
        }
        return todoListdata;
    }

    //delete
    handleDeleteTodo(index) {
        const todoListData = this.fileSystemManager.getAllItems();
        if (index < 0 || index > todoListData.length) {
            return false;
        }
        this.removeItem(todoListData[index]);
        return true;
    }

    handleDeletePokemonTodos(pokemon) {
        pokemon = pokemon.toLowerCase()
        const todoListData = this.filterTodoList('pokemon', this.fileSystemManager.getAllItems());
        const isPokemonFound = todoListData.find(item => ((isNaN(pokemon) && item.pokemon.name == pokemon) || (!isNaN(pokemon) && item.pokemon.id == pokemon)));
        if (isPokemonFound) {
            this.removeItem(isPokemonFound);
            return true;
        }
        return false;
    }

    removeItem(item) {
        this.fileSystemManager.removeItemFromFile(item);
    }

    handleDeleteAllTodos(arg) {
        const todoListData = this.fileSystemManager.getAllItems();
        this.fileSystemManager.saveToFile(this.filterTodoList(arg, todoListData, true));
    }

    editTodo(current, newTodo) {
        const updateTodo = {
            type: current.type,
            item: newTodo,
            message: newTodo
        };
        this.fileSystemManager.removeItemFromFile(current);
        this.fileSystemManager.addItemToFile(updateTodo);
    }

    //pending
    getPendingTodos() {
        return this.itemManager.getItemsLength();
    }

    capitalizeText(text) {
        return text
            .split(' ')
            .map((s) => s[0].toUpperCase() + s.slice(1))
            .join(' ');
    }

    //show pokemon image
    handleShowPokemonImage(pokemon) {
        pokemon = pokemon.toLowerCase();
        const todoListData = this.filterTodoList('pokemon', this.fileSystemManager.getAllItems());
        const isPokemonFound = todoListData.find(item => ((isNaN(pokemon) && item.pokemon.name == pokemon) || (!isNaN(pokemon) && item.pokemon.id == pokemon)));
        if (isPokemonFound) {
            this.showPokemonImage(isPokemonFound);
            return true;
        }
        return false;
    }

    async showPokemonImage(item) {
        const imageUrl = item.pokemon.sprites.front_default;
        const randImageName = `${Math.random().toString(16).slice(2)}.${imageUrl.split('.').reverse()[0]}`;
        try {
            const res = await fetch(imageUrl);
            const imageBuffer = await res.arrayBuffer();

            fs.writeFileSync(randImageName, Buffer.from(imageBuffer));

            const textImage = await this.getPokemonArtImage(randImageName);
            console.log(textImage);
        } catch (e) {
            console.error(e);
        } finally {
            try { fs.unlinkSync(randImageName) } catch (e) { }
        }
    }

    getPokemonArtImage(filepath) {
        return new Promise((resolve, reject) => {
            art.image({
                filepath,
                width: 48,
                height: 48,
                threshold: 40
            }, (error, textImage) => {
                error ? reject(error) : resolve(textImage)
            })
        });
    }

}

export default TodoManager;
