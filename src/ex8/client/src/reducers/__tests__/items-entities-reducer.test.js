import itemsEntitiesReducer from "../items-entities-reducer"

test("should handle ADD_ITEM_SUCCESS", () => {
  const action = {
    type: "add_item_success",
    item: { id: 3, name: "Item 3" },
  }

  const result = itemsEntitiesReducer(undefined, action)

  expect(result).toEqual({
    3: { id: 3, name: "Item 3" },
  })
})

test("should handle REMOVE_ITEM_SUCCESS", () => {
  const action = {
    type: "remove_item_success",
    item: { id: 1, name: "Item 1" },
  }

  const result = itemsEntitiesReducer(
    {
      1: { id: 1, name: "Item 1" },
      2: { id: 2, name: "Item 2" },
    },
    action
  )

  expect(result).toEqual({
    2: { id: 2, name: "Item 2" },
  })
})

test("should handle TOGGLE_ITEM_SUCCESS", () => {
  const action = {
    type: "toggle_item_success",
    itemId: 1,
  }

  const result = itemsEntitiesReducer(
    {
      1: { id: 1, name: "Item 1", status: false },
      2: { id: 2, name: "Item 2", status: true },
    },
    action
  )

  expect(result).toEqual({
    1: { id: 1, name: "Item 1", status: true },
    2: { id: 2, name: "Item 2", status: true },
  })
})
