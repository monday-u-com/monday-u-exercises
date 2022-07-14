import renderer from "react-test-renderer";
import TodoInput from "../todo-input-component";
import {todosList} from "../../../../utils/test-utils";

test('renders correctly TodoItem ', () => {
    const tree = renderer.create(
        <TodoInput todo={todosList}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

