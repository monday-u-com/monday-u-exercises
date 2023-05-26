import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputComp from "./InputComp";
import { addItemsAction } from "../../redux/actions/itemsEntitiesActions";
import { getSearchText } from "../../redux/selectors/items-view-selectors";

import {
	dispatchIsLoading,
	dispatchSearchText,
} from "../../redux/actions/itemsViewActions";

const mapStateToProps = (state, ownProps) => {
	const searchText = getSearchText(state);
	return { searchText };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators(
		{ addItemsAction, dispatchIsLoading, dispatchSearchText },
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(InputComp);
