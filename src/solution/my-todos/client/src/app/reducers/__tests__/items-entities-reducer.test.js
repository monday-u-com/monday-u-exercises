import {emptyArrayInitialState, emptyStringInitialState, todosList} from "../../../utils/test-utils";
import actionTypes from "../../actions/constants/index";
import todoInputReducer from "../todo-input-reducer";
import todoListReducer from "../todo-list-reducer";
import todoSearchReducer from "../todo-search-reducer";
import todoStatusReducer from "../todo-status-reducer";
import spinnerReducer from "../spinner-reducer";
import todoFooterReducer from "../todo-footer-reducer";

const addFirstTodo = {value: 'do homework'}

test('add empty todo - todoInputReducer should return the initial state', () => {
    expect(todoInputReducer({value: ''}, {type: actionTypes.BAD_VALUE})).toEqual(
        emptyStringInitialState
    )
})

test('add todo - todoInputReducer should return the addFirstTodo', () => {
    expect(todoInputReducer(addFirstTodo, {type: actionTypes.ADD_TODO})).toEqual(
        addFirstTodo
    )
})

test('todoListReducer get empty state - should return initial state', () => {
    expect(todoListReducer({todos: []}, {type: ''})).toEqual(
        emptyArrayInitialState
    )
})

test('todoListReducer get empty state - should return initial state', () => {
    expect(todoListReducer({todos: []}, {type: actionTypes.FETCHED_TODOS, todos: todosList}).todos).toEqual(
        todosList
    )
})

test('edit todo - todoListReducer should return updated todos list', () => {
    const todos = [...todosList]
    const todo = todos.splice(2, 1)[0]
    todo.name = todo.message = 'call mom'
    todos.push(todo)
    expect(todoListReducer({todos: todosList}, {type: actionTypes.EDIT_TODO, todo}).todos).toContain(
        todo
    )
})

test('delete todo - todoListReducer should return updated todos list', () => {
    const todos = [...todosList]
    const todo = todos.splice(1, 1)[0]
    expect(todoListReducer({todos: todosList}, {type: actionTypes.DELETE_TODO, todo}).todos).toEqual(
        todos
    )
})

test('delete all todos - todoListReducer should return empty todos list', () => {
    expect(todoListReducer({}, {type: actionTypes.DELETE_ALL_TODOS})).toEqual(
        {todos: []}
    )
})

test('search todo - todoSearchReducer should return search', () => {
    const search = 'do'
    expect(todoSearchReducer({}, {type: actionTypes.SEARCH_TODO, search})).toEqual(
        {search}
    )
})

test('search empty todo - todoSearchReducer should return empty string', () => {
    const search = ''
    expect(todoSearchReducer({}, {type: actionTypes.SEARCH_TODO_BAD_INPUT, search}).search).toEqual(
        emptyStringInitialState.value
    )
})

test('statuses todos - todoStatusReducer should return the todos statuses', () => {
    expect(todoStatusReducer(todosList, {type: actionTypes.STATUS_VALUE, array: todosList}).array).toEqual(
        todosList
    )
})

test('statuses empty todos - todoStatusReducer should return the todos list', () => {
    expect(todoStatusReducer(todosList, {})).toEqual(
        todosList
    )
})

test('spinner active state - spinnerReducer should return spinner active', () => {
    expect(spinnerReducer(todosList, {type: actionTypes.SPINNER_ACTIVE})).toEqual(
        {active: true}
    )
})

test('spinner disabled state - spinnerReducer should return the spinner disabled', () => {
    expect(spinnerReducer(todosList, {type: actionTypes.SPINNER_DISABLED})).toEqual(
        {active: false}
    )
})

test('spinner empty activity - spinnerReducer should return the state', () => {
    expect(spinnerReducer(todosList, {})).toEqual(
        todosList
    )
})

test('footer pending - todoFooterReducer should return the pending todos', () => {
    expect(todoFooterReducer(todosList, {type: actionTypes.PENDING_TODOS, value: todosList.length})).toEqual(
        {value: todosList.length}
    )
})

test('footer empty - todoFooterReducer should return the state', () => {
    expect(todoFooterReducer(todosList, {})).toEqual(
        todosList
    )
})
