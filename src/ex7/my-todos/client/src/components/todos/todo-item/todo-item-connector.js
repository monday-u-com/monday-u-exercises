import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteTodoAction, editTodoItemAction} from "../../../app/actions/todo-item-actions";
import TodoItemComponent from "./todo-item-component";

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({editTodoItemAction, deleteTodoAction}, dispatch);
};

export default connect(null, mapDispatchToProps)(TodoItemComponent);
