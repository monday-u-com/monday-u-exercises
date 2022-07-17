// creating snapshot of component for testing
import renderer from "react-test-renderer"
import ListItemComponent from "../ListItemComponent"

describe("ListItemComponent", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ListItemComponent />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
