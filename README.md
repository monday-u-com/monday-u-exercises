# Monday Exercises - Exercise 4

This is my task for Exercise 4 of Monday-U Full Stack course. Task requirements are detailed below.

-  Please try the app right here: https://weekend-todo.netlify.app/

## Demo:

https://user-images.githubusercontent.com/99750449/174444998-2a6cfa98-ba87-47a0-b7ab-6b22a52c7a6a.mov

## Task requirements:

### The requirements:

-  [x] Create your express backend (include separate `dist` and `server` folders)
-  [x] Your `server.js` file should have all the express boilerplate and host your `dist` directory to any client that requests it (hint: you'll need to `.use` the `express.static` method)
-  [x] Create an `api.js` file that acts as the 'controller' of your backend, handling all the routes (endpoints)
-  [x] Create separate endpoints for (1) fetching all the todo items, (2) creating a new one, and (3) deleting an existing one (hint: don't forget `bodyParser`)
-  [x] Move the pokemon fetching code to the backend - use `axios` instead of `fetch` for your requests
-  [x] On app load (i.e. when a user enters the page) it should fetch all the todo items and render them

### Bonus

-  [x] Create a [middleware](https://expressjs.com/en/guide/using-middleware.html) that makes a log each time a user accesses any of the routes (you can just do a `console.log`)
-  [x] Handle server errors elegantly. Specifically, if anything goes wrong the user should see an error message (ideally, not an alert) with an explanation of what went wrong instead of crashing the page
-  [x] Add a loder/spinner to the page that indicates the client is waiting for an async operation (e.g. a call to the server) to finish
-  [x] Add simple caching to your server. If a user requests for the same pokemon ID three times in the same minute, for example, it should only make a request to the Pokemon API once. You can use a simple in-memory data structure for your cache

## CLI(exc 3)

[Readme](./cli-ex3/README.md)
