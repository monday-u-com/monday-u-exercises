import { render, screen } from "@testing-library/react";
/*i 
chose to render a connector because i need setIsLoading function 
which is part form my itegration and it Happens locally
*/
import TodoListCompConnector from "../TodoListCompConnector";
import { Provider } from "react-redux";
import { store } from "../../../store";

const items = [
	{
		id: 56,
		name: "Take dog out for a walk",
		status: false,
	},
	{
		id: 32,
		name: "Do the dishes",
		status: true,
	},
];
const MockFetchAll = jest.fn(() => items);

describe("ListContainer", () => {
	test("should render both items (one done and one not)", () => {
		const FetchAll = new MockFetchAll();
		render(
			<Provider store={store}>
				<TodoListCompConnector items={items} setAllItemsAction={FetchAll} />
			</Provider>
		);
	});
});
