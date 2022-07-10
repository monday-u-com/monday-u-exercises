import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { search } from "../../actions/search-actions";
import { filterByStatus } from "../../actions/filter-actions";
import TodoAppContainer from "./TodoAppContainer";
import { restoreLastDeletedItem } from "../../actions/restore-item-actions";
import { getLastDeletedItem } from "../../selectors/items-view-selectors";

// Here we map the state into props that we're going to use in the TodoAppContainer component
const mapStateToProps = state => {
    const lastDeletedItem = getLastDeletedItem(state);

    return {
        // The component needs to know if there is an item that can be restored
        // It doesn't need to know which item it is
        isThereItemToRestore: !!lastDeletedItem
    }
};

// Here we map the dispatch actions into props that we're going to use in the TodoAppContainer component
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ search, filterByStatus, restoreLastDeletedItem }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppContainer);
