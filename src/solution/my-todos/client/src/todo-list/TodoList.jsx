import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TodoItem from '../todo-item/TodoItem';
import PropTypes from 'prop-types'
import "./TodoList.scss";

const TodoList = ({ todos, setSpinner, changePendingTodos, refreshState }) => {

    //empty list
    if (!todos.length) {
        return (
            <p className="empty-todo-list">
                Well done your todo list is empty <br />
                <span className="icon">
                    <FontAwesomeIcon icon={faClipboard} /> <br />
                </span>
                Now you will not forget anything :)
            </p>
        )
    }

    return (
        <ul id="todos-list" className="todo-list">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} setSpinner={setSpinner} changePendingTodos={changePendingTodos} refreshState={refreshState} />
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    setSpinner: PropTypes.func,
    refreshState: PropTypes.func,
    todos: PropTypes.array,
    changePendingTodos: PropTypes.func
}

export default TodoList;