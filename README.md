# Monday Exercises - Exercise 5

This is my task for Exercise 5 of Monday-U Full Stack course. Task requirements are detailed below.

-  Please try the app right here: https://weekend-todo.netlify.app/

## Screenshot:

![app screenshot](./dist/readme-assets/Screenshot.png)

## Task requirements:

### The requirements:

-  [x] Install Sequelize and mysql driver. [Sequelize- Getting Started](https://sequelize.org/docs/v6/getting-started/)
-  [x] Install Sequelize CLI. [Installing the CLI](https://sequelize.org/docs/v6/other-topics/migrations/)
-  [x] Initialize Sequelize using `npx sequelize-cli init` inside 'src/server/db' folder
-  [x] Create Items table using [Sequelize migration](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration) - a new table with id and ItemName fields
-  [x] Modify `item_manager.js`: remove items array and modify all item operations to use Item model
-  [x] Create and run a separate migration for adding a `status` column (BOOLEAN) to Items table in your DB
-  [x] Add checkbox to each item in UI to indicate its status (Done vs not)
-  [x] Modify client and server code to support persistence of the new Item status

### Bonus

-  [x] Add "Done" timestamp
-  [x] Add index to the Items table (which columns compose the index?)
-  [ ] Add server validation - create a new item only if not exists (Use transaction)
-  [ ] Add edit capabilities to an item.

## CLI(exc 3)

[Readme](./cli-ex3/README.md)
