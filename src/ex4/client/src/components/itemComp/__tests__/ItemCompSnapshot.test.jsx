import { create, act } from "react-test-renderer";
import ItemComp from "../ItemComp";

const items = [
	{
		id: 56,
		itemName: "Take dog out for a walk",
		status: false,
	},
	{
		id: 32,
		itemName: "Do the dishes",
		status: true,
	},
];

test("renders currectly item, item must include id,itemName,status", () => {
	let root;
	act(() => {
		root = create(items.map((item) => <ItemComp key={item.id} item={item} />));
	});
	expect(root.toJSON()).toMatchSnapshot();
});
