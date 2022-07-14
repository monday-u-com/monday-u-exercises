import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getItems } from "../../redux/selectors/items-entities-selectors";
import { getSearchText } from "../../redux/selectors/items-view-selectors";
import ItemsComp from "./ItemsComp";
import {
	dispatchDeleteItem,
	dispachUpdateItem,
} from "../../redux/actions/itemsEntitiesActions";

const mapStateToProps = (state, ownProps) => {
	const items = getItems(state);
	const searchText = getSearchText(state);
	return { items, searchText };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators(
		{ dispatchDeleteItem, dispachUpdateItem },
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsComp);
