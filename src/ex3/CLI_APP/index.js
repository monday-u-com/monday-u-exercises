#!user/bin/env node

import fetch from 'node-fetch';
import { existsSync, createWriteStream, readFileSync, writeFile } from 'fs';
import figlet from 'figlet';
import chalk from 'chalk';
import gradient from 'gradient-string';
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
const args = process.argv;


// The "index.js" is 8 characters long so -8
// removes last 8 characters
const currentWorkingDirectory = args[1].slice(0, -8);
// add cool animation
const sleep = (ms=2000)=> new Promise((r)=> setTimeout(r,ms));

const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow("The Coolest Todo App!");
    await sleep();
    rainbowTitle.start();
}

function Pokemon(){
    const msg = `POKEMON Was ADDED`;
    figlet(msg,(err,data) =>{
        console.log(gradient.pastel.multiline(data));
    });
}

if (existsSync(currentWorkingDirectory +
		'todo.txt') === false) {
	let createStream = createWriteStream('todo.txt');
	createStream.end();
}
if (existsSync(currentWorkingDirectory +
		'done.txt') === false) {
	let createStream = createWriteStream('done.txt');
	createStream.end();
}

const InfoFunction = () => {
	const UsageText = `
Cool Todo CLI App with Pokemons too
Options :

$ node index.js add "todo item" # Add a new todo

$ node index.js NUMBER # Add a new Pokemon by ID

$ node index.js ls	#Show remaining todos

$ node index.js del NUMBER	 #Delete a Todo by his number

$ node index.js done NUMBER	 #Complete a Todo by his number

$ node index.js help	 #Show usage

$ node index.js report	 #Statistics`;

	console.log(UsageText);
};

const listFunction = () => {

	// Create a empty array
	let data = [];
    
	// Read from todo.txt and convert it into a string
	const fileData = readFileSync(currentWorkingDirectory +
			'todo.txt').toString();

	// Split the string and store into array
	data = fileData.split('\n');

	// Filter the string for any empty lines in the file
	let filterData = data.filter(function(value) {
		return value !== '';
	});

	if (filterData.length === 0) {
		console.log(chalk.bgYellow('There are no pending todos!'));
	}
	for (let i = 0; i < filterData.length; i++) {
		console.log((filterData.length - i) + '. ' +
			filterData[i]);
	}
};

// Check if user input include numbers or not .
const inputOfNums = (inputValue) => {
    const regex = /^[\d,]+$/;
    return regex.test(inputValue);
  }


