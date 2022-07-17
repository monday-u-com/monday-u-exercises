import  renderer  from "react-test-renderer";
import ListItem from "../ListItem";

const pendingTodo = {
  itemId: 1,
  itemName: "play",
  imageUrl: null,
  isPokemon: 0,
  pokemonId: null,
  status: 0,
};


test("renders correctly pending todo", () => {
  const tree = renderer
    .create(<ListItem item={pendingTodo}  />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
