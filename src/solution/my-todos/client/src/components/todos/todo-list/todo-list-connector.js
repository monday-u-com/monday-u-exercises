import {connect} from "react-redux";
import TodoListComponent from "./todo-list-component";
import {getTodoInputValue} from "../../../app/selectors/todo-input-selectors";
import {bindActionCreators} from "redux";
import {fetchTodosAction} from "../../../app/actions/todo-list-actions";
import {getSortByValue} from "../../../app/selectors/todo-sort-by-selectors";
import {getTodoListValue} from "../../../app/selectors/todo-list-selectors";
import {deleteTodoAction} from "../../../app/actions/todo-item-actions";
import {getTodoSearchValue} from "../../../app/selectors/todo-search-selectors";
import {getTodoStatusArray} from "../../../app/selectors/todo-status-selectors";

const mapStateToProps = (state, ownProps) => {
    const sortByValue = getSortByValue(state);
    const searchValue = getTodoSearchValue(state);
    const statusValue = getTodoStatusArray(state);
    const inputValue = getTodoInputValue(state);
    const todosValue = getTodoListValue(state);
    return {inputValue, todosValue, sortByValue, searchValue, statusValue};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({fetchTodosAction, deleteTodoAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComponent);
