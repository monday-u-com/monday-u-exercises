import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Footer from "./Footer";
import { clearAllItemsAction } from "../../redux/actions/itemActions";
import { getItems } from "../../redux/selectors/items-entities-selectors";

const mapStateToProps = (state , ownProps) =>{
    const numOfTasks = getItems(state).length

    return {numOfTasks};
};

const mapDispatchToProps = (dispacth , ownProps) =>{
    return bindActionCreators({clearAllItemsAction}, dispacth);
}

export default connect(mapDispatchToProps,mapStateToProps)(Footer);