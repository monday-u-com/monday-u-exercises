import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import PokemonClient from './PokemonClient.js';
import imageToAscii from 'image-to-ascii';

let rawdata = fs.readFileSync('./todolist.json');
let tasks = JSON.parse(rawdata);
const Pokemon = new PokemonClient();

class cliTodoFunctions {
	constructor(tasks) {
		this.tasks = tasks;
	}

	async getPokemon(id) {
		const pokemonName = await Pokemon.getPokemon(id);
		return pokemonName;
	}

	writeToList(tasksTobeAdded = tasks) {
		fs.writeFile('todolist.json', JSON.stringify(tasksTobeAdded), (err) => {
			if (err) {
				console.error(err);
			}
			if (tasksTobeAdded == tasks) {
				console.log('New todo added successfully');
			}
		});
	}

	readFromList(tasksTobeAdded = tasks, deleteTask = false) {
		let counter = 1;
		let tasksToBePresented = [];
		tasksTobeAdded.forEach((task) => {
			let currTask = `${counter}. ${Object.values(task)[0]}`;
			tasksToBePresented.push(currTask);
			if (!deleteTask) console.log(currTask);
			counter++;
		});
		return tasksToBePresented;
	}

	async handleIdInput(input) {
		const data = input.split(',');
		for (const item of data) {
			let pokemon = await this.getPokemon(item);
			let pokemonName = pokemon.pokemonName;
			let pokemomImage = pokemon.pokemomImage;
			if (pokemonName.includes('was not found')) {
				console.log(
					chalk.bgRed(`[ERROR] Task was not added: ${pokemonName}`)
				);
				return null;
			} else {
				let task = {
					task: `Catch ${pokemonName}`,
				};
				return { task, pokemomImage };
			}
		}
	}

	handleTextInput(input) {
		let finalTaskContent = [];
		let taskContent = input.toLowerCase().split(' ');
		taskContent.forEach((word) => {
			finalTaskContent.push(word.charAt(0).toUpperCase() + word.slice(1));
		});
		taskContent = finalTaskContent.join(' ');
		let task = {
			task: taskContent,
		};
		return task;
	}

	checkIfExsitInList(taskTobeAdded) {
		let flag = false;
		Object.values(tasks).forEach((task) => {
			if (task.task === taskTobeAdded.task) flag = true;
		});
		return flag;
	}

	async addTaskToList(task, pokemomImage) {
		if (this.checkIfExsitInList(task)) {
			console.log(chalk.bgYellow(`${task.task} already exist`));
		} else {
			if (pokemomImage) {
				this.printImage(pokemomImage);
			}
			tasks.push(task);
			this.writeToList();
		}
	}

	async printImage(pokemomImage) {
		imageToAscii(
			pokemomImage,
			{
				bg: false,
				fg: true,
				white_bg: false,
			},
			(err, converted) => {
				console.log(err || converted);
				if (converted) {
					console.log('Good luck catching me');
				}
			}
		);
	}

	async handleAddAction(input) {
		if (input === '') {
			console.log('I cant see any task, please write a task');
			return;
		}
		if (input[0] === '"' && input[input.length - 1] === '"') {
			input = input.slice(1, -1);
		}
		let task;
		// check if number or string
		if (/^[0-9, ]+$/.test(input)) {
			const ids = input.split(',');
			for (const id of ids) {
				task = await this.handleIdInput(id);
				if (task != null)
					this.addTaskToList(task.task, task.pokemomImage);
			}
		} else {
			task = this.handleTextInput(input);
			this.addTaskToList(task);
		}
	}

	async deleteFromList(input) {
		let newTasksList = tasks.slice(0, input);
		let end = tasks.slice(input + 1);
		let tasksTobeAdded = [...newTasksList.concat(end)];
		this.writeToList(tasksTobeAdded);
		console.log('Todo was deleted Succesfuly');
	}

	async selectTaskToBeDeleted() {
		let deleteTask = true;
		let options = this.readFromList(undefined, deleteTask);
		const choice = await inquirer.prompt({
			name: 'action',
			type: 'list',
			message: 'Which task do you want to delete?',
			choices: options,
		});
		this.deleteFromList(options.indexOf(choice.action));
	}
}

export default cliTodoFunctions;
