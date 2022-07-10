import TodoList from "./TodoList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import{deleteItemAction,editItemNameAction,updateCheckBoxAction} from '../../redux/actions/itemActions'

const mapStateToProps = (state , ownProps) => {

    return {};
}

const mapDispatchToProps = (dispatch , ownProps) =>{
    return bindActionCreators (
        {
            deleteItemAction,editItemNameAction,updateCheckBoxAction
            
        },
        dispatch
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)