import Task from "../Task";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders correctly", () => {
   const renderer = new ShallowRenderer();

   const task = {
      id: 3,
      status: true,
      text: "Catch Bulbasaur of type Grass,poison",
      imageURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
   };

   const tree = renderer.render(<Task task={task} />);
   expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
   const renderer = new ShallowRenderer();

   const task = {
      id: 3,
      text: "Hello",
   };

   const tree = renderer.render(<Task task={task} />);
   expect(tree).toMatchSnapshot();
});
