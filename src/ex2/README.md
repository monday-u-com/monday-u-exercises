# Exercise 2 - In depth JS, Async, & MVC

Time for task #2!
Here we'll get your code to look a little more professional + modern, _and_ you'll get to access data from an external API which opens up a lot of doors for you.

## In this section you will practice

**JS** - More in depth, using classes, methods, iterators  
**Async JS** - Working with async code to retrieve data from a public API
**MVC** - Basic design pattern for separating concerns

## What you are going to build

We already have a todo app where you can add your own tasks but... what about adding _pokemon_ related tasks?
Yes, you'll be reaching out to the pokemon API (https://pokeapi.co/) in order to retrieve pokemon information to populate your todos.

But this kind of work requires a bit more code organization, so...

### The requirements:

- [ ] Refactor your current code to use classes with methods (you can copy+paste the code to a new file and refactor there - just make sure to update the `scripts` tag in your `index.html`)
- [ ] Create an ItemManager class (in a new file) to manage the item adding/removing + pokemon fetching - this class does _not_ deal with the DOM
- [ ] Store todos in an array (class attribute) - this should be in the ItemManager class
- [ ] Render todos from the array using a separate render method
- [ ] Remove todos by updating the list and re-rendering
- [ ] Create a PokemonClient class (in a new file) to get data from the Pokemon API - remember the HTML has to be aware of this file...
- [ ] If the user only inputs a number, add a `Catch ${pokemon}` todo to your array of todos (and render it, of course)
- [ ] If the user inputs a comma separated list of IDs, retrieve multiple pokemon in parallel using `Promise.all` and render them all
- [ ] Handle any errors in retrieving the pokemon (i.e. when a user inputs an invalid ID like 44124. See below gif for an example)
- [ ] Add a normal todo item if the input is not a pokemon

When you finish it should look like this:

![](../assets/hw-2.gif)

### Bonus

- [ ] Add a delete all option - make sure you're actually deleting the data, not just removing from the DOM
- [ ] Validate that the user isn't adding the same pokemon todo more than once
- [ ] Get more nested data from the pokemon API and display it as part of the todo item (e.g. “catch bulbasaur the grass/leaf type pokemon”)
  - you'll have to explore the API to understand where to extract that data from =]
- [ ] Modify the API request to use a pokemon’s name instead of its ID if you find a pokemon name (from a closed list of values) in the user’s input. For example, if the user inputs "charmender", you should get the data about charmender from the API by this pokemon's name - you'll have to read the docs for this too to see how that works ;)
- [ ] In the solution file you'll see this piece of code: `pokemons.forEach(this.addPokemonItem);`
  - The `addPokemonItem` method adds the pokemon to the array of todos and renders the todos list again
  - Can you figure out why this line of code is inefficient? Can you improve it?
- [ ] Have another cool idea? Go wild!
