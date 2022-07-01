# Exercise 6 - React

Let's get Reactive 🥳

## In this section you will practice

**Initializing React project** - Use [create-react-app](https://github.com/facebook/create-react-app) to set up a basic React application

**React components** - Creating and using controlled and uncontrolled components

**State and Props** - Handling and passing data in and between different components

**CSS** - Connecting CSS to components using CSS Modules

**Hooks** - Using `useState`, `useCallback`, `useMemo` && `useEffect` to handle the component's state and lifecycle

**Data fetching** - Data fetching from a component, handling communication issues and empty/loading state

## What you are going to build

In the last exercise, you have made your application's data persistent using a DB.

Now you are going to give the client side a makeover using React.

This will make your project:
* **Easier to maintain** - Having a component for each "UI part" of our client
* **Hooked to the DOM** - By using JSX you can directly manipulate DOM
* **Increased performance** - React works with a Virtual DOM to improve the performance of your project
* **"Common"** - React is wildly used in the community and has tons of info about different use-cases you may encounter while developing

### The requirements:
- [ ] Remove `app.use(express.static(path.join(__dirname, 'dist')))` from your `server.js` file
- [ ] Delete `src/server/dist` **ONLY** when your new client is up and running 
- [ ] Initialize your React project in the `src` folder using [create-react-app](https://create-react-app.dev/docs/getting-started/) with the name `client`
- [ ] Decompose your Todo App into components (controlled and uncontrolled)
- [ ] Re-Implement the Todo App using hooks
- [ ] Use [**propTypes** & **defaultProps**](https://reactjs.org/docs/typechecking-with-proptypes.html) to add type-checking to your components

#### Your todo app is now:
- Very easy to maintain and scale
- Can use a vast amount of packages for almost every use-case
- More performant out of the box

### Bonus
- [ ] Add error handling for communication issues with your backend (Empty state / Loader / Something else)
- [ ] Use components from the [Vibe Design System](https://github.com/mondaycom/monday-ui-react-core) (monday.com's component library)
- [ ] Use [React Router](https://reactrouter.com/docs/en/v6) to add basic routing capabilities to your app
  - [ ] Add Tabs / Navigation bar to help route between pages [Tabs example](https://style.monday.com/?path=/docs/navigation-tabs-tab--overview)
  - Page suggestions
    - [ ] Task completion statistics page - # of open tasks, total number of tasks, average tim to finish a task, etc.
    - [ ] About page - with some fun facts and profile picture
