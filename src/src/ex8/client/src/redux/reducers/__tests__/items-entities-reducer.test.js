import itemsEntitiesReducer from "../items-entities-reducer";
import { addItems } from "../../actions/ItemActions";



const previousItems = [
    { id: 1, text: "Shopping", isPokemon: false },
    { id: 2, text: "GYM", isPokemon: false },
    { id: 3, text: "X-box", isPokemon: false },
  ];
  
  const newItems = [
    { id: 4, text: "Charizard", isPokemon: true },
    { id: 5, text: "Bulbasaur", isPokemon: true },
  ];
  
  test("Should return initial state", () => {
    expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({
      tasksStatus: true,
      searchInput: "",
      items: [],
    });
  });
  
  test("Should add New Todos to Empty List", () => {
    const previousState = {
      items: [],
    };
    expect(itemsEntitiesReducer(previousState, addItems(newItems))).toEqual({
      items: [...newItems],
    });
  });
  
  test('Should Add new todos to exsiting List', () => {
      const previousState = { items: [...previousItems] };
      expect(itemsEntitiesReducer(previousState, addItems(newItems))).toEqual(
        { items: [...previousItems, ...newItems] }
      )
    })