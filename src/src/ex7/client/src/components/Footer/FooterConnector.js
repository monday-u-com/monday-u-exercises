import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Footer from "./Footer";
import { clearAllItemsAction } from "../../redux/actions/ItemActions";
import { getItems } from "../../redux/selectors/itemsEntitiesSelectors";
const mapStateToProps = (state, ownProps) => {
    
    const numOfTasks = getItems(state).length
    return {numOfTasks};
};

const mapDispatchToProps = (dispacth , ownProps) =>{
    return bindActionCreators({clearAllItemsAction}, dispacth);
}

export default connect(mapDispatchToProps,mapStateToProps)(Footer);

