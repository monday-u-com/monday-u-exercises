import Task from "../Task";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders pokemon task correctly with true status", () => {
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

it("renders pokemon task correctly with false status", () => {
   const renderer = new ShallowRenderer();

   const task = {
      id: 3,
      status: false,
      text: "Catch Bulbasaur of type Grass,poison",
      imageURL: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
   };

   const tree = renderer.render(<Task task={task} />);
   expect(tree).toMatchSnapshot();
});

it("renders regular task correctly without status", () => {
   const renderer = new ShallowRenderer();

   const task = {
      id: 3,
      text: "Hello",
   };

   const tree = renderer.render(<Task task={task} />);
   expect(tree).toMatchSnapshot();
});

it("renders regular task correctly with status true", () => {
   const renderer = new ShallowRenderer();

   const task = {
      id: 3,
      text: "Hello",
      status: true,
   };

   const tree = renderer.render(<Task task={task} />);
   expect(tree).toMatchSnapshot();
});
