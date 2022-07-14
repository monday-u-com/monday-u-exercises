import renderer from "react-test-renderer";
import {todosList} from "../../../../utils/test-utils";
import TodoList from "../todo-list-component";
import {Provider} from 'react-redux';
import {store} from '../../../../app/store';
import React from "react";


const testFunction = (props) => {
    return renderer.create(
        <React.StrictMode>
            <Provider store={store}><TodoList {...props} fetchTodosAction={jest.fn(() => todosList)}/></Provider>
        </React.StrictMode>
    ).toJSON();
}


describe('Todo list tests', () => {
    test('renders correctly TodoList with empty todos list ', () => {
        const tree = testFunction({todosValue: []})
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly TodoList with todos list ', () => {
        const tree = testFunction({todosValue: todosList})
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly TodoList with searchValue', () => {
        const tree = testFunction({todosValue: todosList, searchValue: 'do'})
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly TodoList with sortByValue', () => {
        const tree = testFunction({todosValue: todosList, sortByValue: 'Z-A'})
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly TodoList with statusValue', () => {
        const tree = testFunction({todosValue: todosList, statusValue: 0})
        expect(tree).toMatchSnapshot();
    });

})


