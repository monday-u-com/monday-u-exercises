import ItemClient from "../../api/itemClient";
import actions from "../actions/constants";
import {spinner} from "../actions/spinner-actions";

const itemClient = new ItemClient();

export function saveNewTodo(input) {
    return async function saveNewTodoThunk(dispatch, getState) {
        spinner(dispatch, true);
        const response = await itemClient.addTodo(input);
        const todos = response.body;

        dispatch({type: actions.ADD_TODO, value: input, todos});

        checkForDuplicateTodos(todos);
        spinner(dispatch, false);
    }
}


const checkForDuplicateTodos = (todos) => {
    const duplicates = todos.filter(todo => todo.type == 'pokemonExists' || todo.type == 'todoExists');
    if (!duplicates.length) {
        return;
    }
    let content = 'The following todos are already exist: \n';
    duplicates.forEach((todo) => {
        if (todo.type == 'pokemonExists') {
            content += `id: ${todo.pokemon.id}, name: ${todo.pokemon.name} \n`;
        } else {
            content += `${todo.item}\n`;
        }
    });
    alert(content);
}

