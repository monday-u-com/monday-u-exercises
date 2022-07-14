import renderer from "react-test-renderer";
import TodoItem from "../todo-item-component";
import {todosList} from "../../../../utils/test-utils";

test('renders correctly TodoItem ', () => {
    const tree = renderer.create(
        <TodoItem todo={todosList[0]}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

