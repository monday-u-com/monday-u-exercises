import { create, act } from "react-test-renderer";
import ItemsComp from "../ItemsComp";

const items = [
	{
		id: 56,
		itemName: "Take dog out for a walk",
		status: false,
		pokedexId: 25,
	},
	{
		id: 32,
		itemName: "Do the dishes",
		status: true,
		pokedexId: 1,
	},
];

test("renders currectly items Array item must include id,itemName,status,pokedexId", () => {
	let root;
	act(() => {
		root = create(<ItemsComp items={items} searchText={""} />);
	});
	expect(root.toJSON()).toMatchSnapshot();

	act(() => {
		root.update(<ItemsComp items={items} searchText={items[1].itemName} />);
	});
	expect(root.toJSON()).toMatchSnapshot();

	act(() => {
		root.update(<ItemsComp items={items} searchText={items[0].pokedexId} />);
	});
	expect(root.toJSON()).toMatchSnapshot();
});
