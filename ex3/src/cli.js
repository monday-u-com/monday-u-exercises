import cliTodoFunctions from './cliTodoFunctions.js';
import inquirer from 'inquirer';
import readlineSync from 'readline-sync';
import helpSection from './cliHelp.js';

const todo = new cliTodoFunctions();

async function run() {
	let options = [
		'1. Add new task',
		'2. See all of the tasks',
		'3. Delete task',
		'4. Help',
	];
	const choice = await inquirer.prompt({
		name: 'action',
		type: 'list',
		message: 'Please select your desired action',
		choices: options,
	});

	switch (options.indexOf(choice.action) + 1) {
		case 1:
			const input = readlineSync.question(
				'What task do you want to add? '
			);
			todo.handleAddAction(input);
			break;
		case 2:
			todo.readFromList();
			break;
		case 3:
			todo.selectTaskToBeDeleted();
			break;

		case 4:
			console.log(helpSection.help);
			break;
	}
}
run();
