import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NumOfItemsComp from "./NumOfItemsComp";
import { getItems } from "../../redux/selectors/items-entities-selectors";

const mapStateToProps = (state, ownProps) => {
	const itemsLength = getItems(state).length;
	return { itemsLength };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NumOfItemsComp);
