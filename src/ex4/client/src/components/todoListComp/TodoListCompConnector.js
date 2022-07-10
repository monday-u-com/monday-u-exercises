import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TodoListComp from "./TodoListComp";
import {
	setAllItemsAction,
	dispatchClearAll,
	dispatchUndoLastAction,
} from "../../redux/actions/itemsEntitiesActions";
import {
	getItems,
	getLastAction,
} from "../../redux/selectors/items-entities-selectors";
import { getIsLoading } from "../../redux/selectors/items-view-selectors";
import {
	dispatchIsLoading,
	dispatchOpenToast,
} from "../../redux/actions/itemsViewActions";

const mapStateToProps = (state, ownProps) => {
	const items = getItems(state);
	const isLoading = getIsLoading(state);
	const lastAction = getLastAction(state);
	return { items, isLoading, lastAction };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return bindActionCreators(
		{
			setAllItemsAction,
			dispatchClearAll,
			dispatchIsLoading,
			dispatchUndoLastAction,
			dispatchOpenToast,
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListComp);
