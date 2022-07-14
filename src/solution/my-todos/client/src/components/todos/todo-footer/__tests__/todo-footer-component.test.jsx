import renderer from "react-test-renderer";
import FooterPage from "../todo-footer-component";
import {todosList} from "../../../../utils/test-utils";

test('renders correctly TodoItem ', () => {
    const tree = renderer.create(
        <FooterPage todosValue={todosList} pendingTodosValue={5}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

