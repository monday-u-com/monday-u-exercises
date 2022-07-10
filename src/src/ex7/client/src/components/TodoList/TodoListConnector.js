import TodoList from "./TodoList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import{deleteItemAction,editItemNameAction,updateCheckBoxAction} from '../../redux/actions/ItemActions'

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