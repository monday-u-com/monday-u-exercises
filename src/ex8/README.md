# Exercise 8 - Testing

## In this section you will practice

**Setup testing for your client using jest + cypress**

- Jest is already installed with your react setup so no need to install it

- Under the `package.json` file go to "scripts" and append `--watchAll=false` into the "test" runner.

  ```json
  "scripts": {
      ...,
      "test": "react-scripts test --watchAll=false",
      ...
    },
  ```

- Create a new file (or edit if already exists) called `App.test.js` under the `client/src` folder (right next to the `App.js` file) with the following content

  ```javascript
  import { render, screen } from "@testing-library/react";
  import { BrowserRouter } from "react-router-dom";
  import { Provider } from "react-redux";
  import { store } from "./store";
  import App from "./App";

  test("renders learn react link", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/Todo App/i);
    expect(linkElement).toBeInTheDocument();
  });
  ```

- Now you can run `npm run test` and see that all tests pass

## What you are going to build

In the last exercise, you have changed your application to use React and Redux.

Now you are going to test the components you have built with:

- Unit tests
- Snapshot tests
- Integration tests

This will make your project:

- **Trustworthy** - Less bugs overall that the users experience
- **Stable** - Confidence when refactoring code / adding new code
- **Better** - Testable code is more readable and understandable

### The requirements:

- [ ] Unit tests - test `itemsEntitiesReducer` - add 3 unit tests
      you should create a new `__tests__` folder under the reducers folder and a new test file for it

  ```
  client/src/reducers/__tests__/items-entities-reducer.test.js
  ```

  you can use this link for some help https://redux.js.org/usage/writing-tests#reducers

- [ ] Snapshot tests - 2 components

      ListItemComponent
      AboutComponent

  you should create 2 new test files next to the original components in a designated folder called `__tests__`

  ```
  client/src/components/list-container/list-item-component/__tests__/ListItemComponent.test.jsx

  client/src/components/about-component/__tests__/AboutComponent.test.jsx
  ```

- [ ] Integration tests - send 2 items to the

      ListContainer

  you should create a new test file next to the original components in a designated folder called `__tests__`

  ```
  client/src/components/list-container/__tests__/ListContainer.test.jsx
  ```

  copy this template to it:

  ```javascript
  import { render, screen } from "@testing-library/react";
  import ListContainer from "../ListContainer";
  import { Provider } from "react-redux";
  import { store } from "../../../store";

  const items = [
    {
      id: 56,
      name: "Take dog out for a walk",
      status: false,
    },
    {
      id: 32,
      name: "Do the dishes",
      status: true,
    },
  ];

  describe("ListContainer", () => {
    test("should render both items (one done and one not)", () => {
      render(
        <Provider store={store}>
          <ListContainer items={items} fetchItems={jest.fn(() => items)} />
        </Provider>
      );

      // TODO: test that both items are rendered at the list
    });
  });
  ```

  What does the template do?
  it renders the ListContainer with a redux store (becuase ListContainer renders some more components that rely on the store to exist)

  we also send the fetchItems function this component as a mocked function that gets us the same items (becuase we dont have a real server or action that does it)

- [ ] Create a new test that mocks `fetchItems` and make sure it has been called (do it under the same test file as the ListContainer tests)

### Bonus

- [ ] Coverage - get to 50% coverage for `items-entities-reducer.js` file
- [ ] Add snapshot tests with more props variations
- [ ] Add an E2E test to the project using cypress

**Setup cypress:**

1. Copy e2e folder to your project directory (right next to the client and server folders)
2. Start your project as you normally would for development
3. Open a terminal under the e2e folder and run the following commands:

```bash
npm install
npm run cypress:open
```

A window will open up, click on "E2E Testing"

All done you can now write cypress tests :)
