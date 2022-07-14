import { itemsEntitiesReducer } from "../items-entities-reducer"

test("should handle FETCH_ITEMS_SUCCESS", () => {
  const action = {
    type: "FETCH_ITEMS_SUCCESS",
    items: [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ],
  }

  const result = itemsEntitiesReducer(undefined, action)

  expect(result).toEqual({
    1: { id: 1, name: "Item 1" },
    2: { id: 2, name: "Item 2" },
  })
})

test("should handle ADD_ITEM_SUCCESS", () => {
  const action = {
    type: "ADD_ITEM_SUCCESS",
    item: { id: 3, name: "Item 3" },
  }

  const result = itemsEntitiesReducer(undefined, action)

  expect(result).toEqual({
    3: { id: 3, name: "Item 3" },
  })
})

test("should handle REMOVE_ITEM_SUCCESS", () => {
  const action = {
    type: "REMOVE_ITEM_SUCCESS",
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
