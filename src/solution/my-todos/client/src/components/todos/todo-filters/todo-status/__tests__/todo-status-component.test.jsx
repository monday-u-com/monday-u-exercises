import renderer from "react-test-renderer";
import TodoStatus from "../todo-status-component";
import {todosStatusOptions} from "../../../../../app/actions/todo-status-actions";

test('renders correctly TodoStatus ', () => {
    const tree = renderer.create(
        <TodoStatus todoStatusArray={todosStatusOptions}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

