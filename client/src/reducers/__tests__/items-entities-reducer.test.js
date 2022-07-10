import itemsEntitiesReducer from "../items-entities-reducer";
import actionTypes from "../../actions/constants";

test("should return the initial state", () => {
   expect(itemsEntitiesReducer(undefined, { type: undefined })).toEqual({ tasks: [] });
});

test("should handle a task being added to an empty list", () => {
   const previousState = { tasks: [] };
   const action = {
      type: actionTypes.ADD_TASK_FULFILLED,
      payload: [{ id: 1, text: "A todo" }],
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [{ id: 1, text: "A todo" }],
   });
});

test("should handle a task being added to an existing list", () => {
   const previousState = {
      tasks: [{ id: 1, text: "A todo" }],
   };
   const action = {
      type: actionTypes.ADD_TASK_FULFILLED,
      payload: [{ id: 2, text: "A new todo" }],
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [
         { id: 1, text: "A todo" },
         { id: 2, text: "A new todo" },
      ],
   });
});

test("should clear all tasks from an existing list", () => {
   const previousState = {
      tasks: [
         { id: 1, text: "A todo" },
         { id: 2, text: "A new todo" },
      ],
   };
   const action = {
      type: actionTypes.CLEAR_TASKS_FULFILLED,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [],
   });
});

test("should clear all tasks from an empty list", () => {
   const previousState = {
      tasks: [],
   };
   const action = {
      type: actionTypes.CLEAR_TASKS_FULFILLED,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [],
   });
});

test("should delete one task from an existing list", () => {
   const previousState = {
      tasks: [
         { id: 1, text: "A todo" },
         { id: 2, text: "A new todo" },
      ],
   };
   const action = {
      type: actionTypes.DELETE_TASK_FULFILLED,
      payload: 1,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [{ id: 2, text: "A new todo" }],
   });
});

test("should delete one task from an empty list", () => {
   const previousState = {
      tasks: [],
   };
   const action = {
      type: actionTypes.DELETE_TASK_FULFILLED,
      payload: 3,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [],
   });
});

test("should delete one task which does not exist in the list", () => {
   const previousState = {
      tasks: [
         { id: 1, text: "A todo" },
         { id: 2, text: "A new todo" },
      ],
   };
   const action = {
      type: actionTypes.DELETE_TASK_FULFILLED,
      payload: 5,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [
         { id: 1, text: "A todo" },
         { id: 2, text: "A new todo" },
      ],
   });
});

test("should checkmark one task from the list, false to true", () => {
   const previousState = {
      tasks: [
         { id: 1, text: "A todo", status: false },
         { id: 2, text: "A new todo", status: false },
      ],
   };
   const action = {
      type: actionTypes.CHECKMARK_TASK_FULFILLED,
      payload: 2,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [
         { id: 1, text: "A todo", status: false },
         { id: 2, text: "A new todo", status: true },
      ],
   });
});

test("should checkmark one task from the list, true to false", () => {
   const previousState = {
      tasks: [
         { id: 1, text: "A todo", status: false },
         { id: 2, text: "A new todo", status: true },
      ],
   };
   const action = {
      type: actionTypes.CHECKMARK_TASK_FULFILLED,
      payload: 2,
   };

   expect(itemsEntitiesReducer(previousState, action)).toEqual({
      tasks: [
         { id: 1, text: "A todo", status: false },
         { id: 2, text: "A new todo", status: false },
      ],
   });
});
