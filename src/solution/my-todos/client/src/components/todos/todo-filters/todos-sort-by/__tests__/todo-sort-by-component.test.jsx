import renderer from "react-test-renderer";
import TodoSortBy from "../todo-sort-by-component";
import {todosSortByOptions} from "../../../../../app/actions/todo-sort-by-actions";

test('renders correctly TodoSortBy ', () => {
    const tree = renderer.create(
        <TodoSortBy defaultValue={todosSortByOptions[0]}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

