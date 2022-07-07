import {combineReducers} from "redux";
import spinner from './spinner-reducer'
import todoList from './todo-list-reducer'
import todoSort from './todo-sort-by-reducer'
import todoInput from './todo-input-reducer'
import todoFooter from './todo-footer-reducer'
import todoSearch from './todo-search-reducer'
import todoStatus from './todo-status-reducer'

const allReducers = combineReducers({
    spinner,
    todoList,
    todoInput,
    todoSort,
    todoFooter,
    todoStatus,
    todoSearch,
});
export default allReducers;