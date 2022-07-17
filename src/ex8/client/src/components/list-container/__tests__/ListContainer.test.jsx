import { render, screen } from "@testing-library/react"
import ListContainer from "../ListContainer"
import { Provider } from "react-redux"
import { store } from "../../../store"

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
]

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    render(
      <Provider store={store}>
        <ListContainer items={items} fetchItems={jest.fn(() => items)} />
      </Provider>
    )

    // TODO: test that both items are rendered at the list
    expect(screen.getByText("Take dog out for a walk")).toBeInTheDocument()
    expect(screen.getByText("Do the dishes")).toBeInTheDocument()
  })
})
