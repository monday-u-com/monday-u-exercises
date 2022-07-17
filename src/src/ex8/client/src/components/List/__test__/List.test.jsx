import { store } from "../../../store";
import { Provider } from "react-redux";
import List from "../List";
import '@testing-library/jest-dom'

import AppContainer from "../../AppContainer/AppContainer";
import { render, screen } from "@testing-library/react";

const items = [
  {
    itemId: 1,
    item: "play",
    imageUrl: null,
    isPokemon: 0,
    pokemonId: null,
    status: false,
  },
  {
    itemId: 2,
    item: "gym",
    imageUrl: null,
    isPokemon: 0,
    pokemonId: null,
    status: true,
  },
];
  describe("List", () => {
    test("should render both items (one done and one not)", () => {
      render(
        <Provider store={store}>
    <List items={items} searchInputValue={''} />;
    </Provider>)
     const playTodo = screen.getByTestId(`item-${items[0].itemId}`);
     expect(playTodo).toBeInTheDocument();
     const checkbox = screen.getAllByRole('checkbox');
     expect(checkbox[0]).not.toBeChecked()
 
     const gymTodo = screen.getByTestId(`item-${items[0].itemId}`);
     expect(gymTodo).toBeInTheDocument();
     expect(checkbox[1]).toBeChecked()
  });
});
  
    test("should call fetchItems function", () => {
      const getmockItemsAction = jest.fn(() => items);
      render(
        <Provider store={store}>
          <AppContainer items={items} getItemsAction={getmockItemsAction} />
        </Provider>
      );
      expect(getmockItemsAction).toHaveBeenCalled();
    });
 
  