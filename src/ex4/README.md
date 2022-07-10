# Exercise 5 - Sequelize ORM

It is not persisted until you persist it!

## In this section you will practice

**Initializing Sequelize ORM** - Connect NodeJS application to your mysql DB using Sequelize ORM

**Sequelize models** - Use Sequelize models to execute queries on your DB

**Migrations and seeds** - Manage DB changes using Sequelize migrations

## What you are going to build

In the last exercise, you've added an ExpressJS server to your todo app, which allowed you to reload your todos from server.

But what happens when you restart your server?! you guessed right, all todos disappeared :(

In this exercise we will add a DB to our application that will hold all items' data. This will provide us a real persistent storage that would keep our data even if our server is down.

You can use your ex4 solution or use the boilerplate in this folder.

### Prerequisites:

Following pre-requisites were covered in our last workshop.

- Download and install [docker](https://docs.docker.com/get-docker/)
- Open
