# Exercise 3 - Node.js, CLI

Time for task #3!<br>

## In this section you will practice

**Node.js** - Build your first node.js cli app <br> 
**Npm** - Work with external libraries <br>
**Files** - Read and write from the file system <br>

## What you are going to build

We already have a beautiful todo app that will help us to catch all the pokemons. <br>
Now let's create cli tool, so we can add, delete, and view todos like a real pro 👩‍💻 🧑‍💻 

Use your code from the last exercise and refactor where needed.

### The requirements:

- [v] Build node.js cli todo app
- [v] Detailed help option
- [v] Read/Write/Delete todos from a file

When you finish it should look like this:

![](../assets/cli.gif)

### Bonus

- [ ] Publish your code as npm package and run it with npx
- [v] Add colors to your cli tool
- [v] Add Inquirer.js and make you cli tool interactive
- [v] Display pokemon image (ascii art)




## Run with npx

Install the package globally:
```
npm install -g todo-app-commander
```
Run:
```
npx todo-app-commander
```
## Run with options
Option | Description
--- | --- 
  -V, --version            |Output the version number
  -h, --help               |Display help for command
  get [options]            |Displays the todo list
  add <string>             |Write your todos or pokemons to the todo list
  delete <number>          |Delete a single todo by index
  delete-pokemon <string>  |Delete a single pokemon todo by pokemon ID or name
  delete-not-found         |Delete all not found pokemons todos
  delete-all [options]     |Delete all todos by group type
  pending-tasks            |Show your pending tasks
  interactive              |Use interactive menu
  help [command]           |display help for command

## Run Interactive
```
npx todo-app-commander interactive
```



