import itemsEntitiesReducer from "../items-entities-reducer";
import ACTIONS from "../../actions/constants";

test("should return the initial state", () => {
  expect(itemsEntitiesReducer(undefined, { type: "TEST" })).toEqual({
    "isLoading": false,
    todoList: [],
    removedTasks: [],
  });
});

test("should return removedTasks no longer then 10", () => {
  const tasksList = [];
  for (let i = 0; i < 10; i++) tasksList.push({ itemName: `task${i}` });
  const state = { todoList: [], removedTasks: tasksList };
  const action = { type: ACTIONS.DELETE_TASK, task: { itemName: "lastTask" } };
  expect(itemsEntitiesReducer(state, action).removedTasks.length).toEqual(10);
  expect(JSON.stringify(itemsEntitiesReducer(state, action))).not.toMatch(
    /task0/
  );
});

test("should add the tasks to existing list", () => {
  const task = { itemName: "test" };
  const state = { todoList: [task], removedTasks: [] };
  const action = { type: ACTIONS.ADD_TASK, task: [{ itemName: "test2" }] };
  expect(itemsEntitiesReducer(state, action).todoList.length).toEqual(2);
  expect(JSON.stringify(itemsEntitiesReducer(state, action))).toMatch(/test2/);
});


