# Exercise 7 - Redux

## In this section you will practice

**Setup Redux with your React project** - Use the provided files to configure redux with your application.

* Add the following packages into your package.json file:
  * `"@reduxjs/toolkit": "^1.8.1"`
  * `"react-redux": "^8.0.1"`
* Copy the following files and directories into your application:
  * `client/src/store.js`
  * `client/src/actions`
  * `client/src/reducers`
  * `client/src/selectors`
* Wrap your `App` component with `Provider` and pass it the store:
  
  `<Provider store={store}><App /></Provider>`

  (See `client/src/index.js` file for example) 
* You may need to update your server so it returns to the client the item that was added.

**Store** - Initialize state and use dispatch to trigger actions

**Reducer** - Catch actions and return new state when it's needed 

**Selector** - Extract relevant data from the store

**Connector** - Pass data from the store to the component

## What you are going to build

In the last exercise, you have changed your application to use React. Each of your components has its own local state.

Now you are going to use Redux to pass state between different components.

This will make your project:
* **State management** - Having a global state for your application
* **Easier to pass state between components** - Make it easier to pass different state's properties between multiple components in a different hierarchy
* **"Common"** - Redux is wildly used in the community and has tons of info about different use-cases you may encounter while developing

### The requirements:
- [ ] Use redux actions for communicating with the server (fetching items, adding a new item, etc.)
- [ ] Move the items from local component's state into the store
- [ ] Handle failure of requests from the server
- [ ] Handle loading
- [ ] Add search
- [ ] Add the ability to hide items that were marked as done or to show only them
- [ ] Add a logger middleware to your application

#### Your todo app is now:
- Very easy to maintain and scale
- Can use a vast amount of packages for almost every use-case
- More performant out of the box

### Bonus
- [ ] \* Debounce search
- [ ] \* Implement an option to restore the last item that was deleted
- [ ] ** Make your application accessible, i.e. keyboard navigation (ctrl+Enter create new, tab navigation)
