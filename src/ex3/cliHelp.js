import meow from 'meow';
import chalk from 'chalk';

const helpSection = meow(
	`
	${chalk.yellowBright(`Functions`)}:
	1. Add new task -  Can be a string, a single number or number of numbers spererated by commas.
	2. See all of the tasks  - Get an orderd list of your current todo tasks
	3. Delete task - Delete a specific task from your todo list
	4. Help - Gets you to this tutorial
	
	${chalk.yellowBright(`Usage`)}:
		Run -> $ node .

		-> a list of all of the availavle options will appear, select your desired one. (Use arrow keys)
		-> once you've selected your desired option please enter a task you want to add or the number of task you want to delete.

	${chalk.yellowBright(`Examples`)}:
		$ node .
		? Please select your desired action (Use arrow keys)
			1. Add new task 
			2. See all of the tasks 
			3. Delete task 
			4. Help 
		
			? Please select your desired action 1. Add new task
			What task do you want to add?  3,4,5,6

			New todo added successfully
			Catch charmander already exist
			Catch charmeleon already exist
			New todo added successfully		
`,
	{
		importMeta: import.meta,
	}
);

export default helpSection;
