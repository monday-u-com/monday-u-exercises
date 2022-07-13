# Monday Exercises - Exercise 8 - Testing

This is my task for Exercise 8 of Monday-U Full Stack course. Task requirements are detailed below.

-  Please try the app (older version) right here: https://weekend-todo.netlify.app/

## Demo video:

https://user-images.githubusercontent.com/99750449/178054260-7cbc307e-ba85-439d-a32d-63e80349e146.mp4

## Task requirements:

-  [x] Unit tests - test `itemsEntitiesReducer` - add 3 unit tests
       you should create a new `__tests__` folder under the reducers folder and a new test file for it

   ```
   client/src/reducers/__tests__/items-entities-reducer.test.js
   ```

   you can use this link for some help https://redux.js.org/usage/writing-tests#reducers

-  [x] Snapshot tests - 2 components

       ListItemComponent
       AboutComponent

   you should create 2 new test files next to the original components in a designated folder called `__tests__`

   ```
   client/src/components/list-container/list-item-component/__tests__/ListItemComponent.test.jsx
   client/src/components/about-component/__tests__/AboutComponent.test.jsx
   ```

-  [x] Integration tests - send 2 items to the

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

-  [x] Create a new test that mocks `fetchItems` and make sure it has been called (do it under the same test file as the ListContainer tests)

### Bonus

-  [x] Coverage - get to 50% coverage for `items-entities-reducer.js` file
-  [x] Add snapshot tests with more props variations
-  [x] Add an E2E test to the project using cypress

## CLI(exc 3)

[Readme](./cli-ex3/README.md)
