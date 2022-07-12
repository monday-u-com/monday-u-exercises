import renderer from "react-test-renderer";
import AboutCard from "../AboutCard";

it("renders correctly", () => {
   const tree = renderer.create(<AboutCard />).toJSON();
   expect(tree).toMatchSnapshot();
});
