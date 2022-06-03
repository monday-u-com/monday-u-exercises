# Exercise 2

This is my task for Exercise 2 of Monday-U Full Stack course. Task requirements are detailed below. In this version you can continue adding tasks the same way as the last one, but in addition can add Pokemon related tasks as you can see in the GIFS below.

-  Please try the app right here: https://weekend-todo.netlify.app/

## Single pokemon catch:

![single pokemon](./src/assets/singlePokemon.gif)

## Multiply Pokemon catch:

![multiple pokemon](./src/assets/multiplePokemon.gif)

## Pokemon with invalid IDS:

![invalid pokemon](./src/assets/invalidPokemon.gif)

## Regular tasks still an option:

![regular tasks](./src/assets/tasks.gif)

## Task requirements:

### The requirements:

-  [x] Refactor your current code to use classes with methods (you can copy+paste the code to a new file and refactor there - just make sure to update the `scripts` tag in your `index.html`)
-  [x] Create an ItemManager class (in a new file) to manage the item adding/removing + pokemon fetching - this class does _not_ deal with the DOM
-  [x] Store todos in an array (class attribute) - this should be in the ItemManager class
-  [x] Render todos from the array using a separate render method
-  [x] Remove todos by updating the list and re-rendering
-  [x] Create a PokemonClient class (in a new file) to get data from the Pokemon API - remember the HTML has to be aware of this file...
-  [x] If the user only inputs a number, add a `Catch ${pokemon}` todo to your array of todos (and render it, of course)
-  [x] If the user inputs a comma separated list of IDs, retrieve multiple pokemon in parallel using `Promise.all` and render them all
-  [x] Handle any errors in retrieving the pokemon (i.e. when a user inputs an invalid ID like 44124. See below gif for an example)
-  [x] Add a normal todo item if the input is not a pokemon

### Bonus

-  [x] Add a delete all option - make sure you're actually deleting the data, not just removing from the DOM
-  [x] Validate that the user isn't adding the same pokemon todo more than once
-  [x] Get more nested data from the pokemon API and display it as part of the todo item (e.g. “catch bulbasaur the grass/leaf type pokemon”)
   -  you'll have to explore the API to understand where to extract that data from =]
-  [x] Modify the API request to use a pokemon’s name instead of its ID if you find a pokemon name (from a closed list of values) in the user’s input. For example, if the user inputs "charmender", you should get the data about charmender from the API by this pokemon's name - you'll have to read the docs for this too to see how that works ;)
-  [ ] In the solution file you'll see this piece of code: `pokemons.forEach(this.addPokemonItem);`
   -  The `addPokemonItem` method adds the pokemon to the array of todos and renders the todos list again
   -  Can you figure out why this line of code is inefficient? Can you improve it?
-  [x] Have another cool idea? Go wild! -
   -  [x] **I Added pokemon pictures that the user caught.**
