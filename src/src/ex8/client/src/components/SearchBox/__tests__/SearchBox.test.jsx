import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";

test("Search box response properly", ()=>{
    const tree = renderer
    .create(<SearchBox searchInputValue={'play'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot()
})