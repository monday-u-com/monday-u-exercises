import React, {useCallback, useEffect} from "react";
import "./todo-footer.scss";

const FooterPage = ({todosValue, pendingTodosValue, clearAllAction, getPendingTodosAction}) => {

    useEffect(() => {
        getPendingTodosAction();
    }, [todosValue]);

    const clearAllClick = useCallback(() => {
        clearAllAction();
    }, [clearAllAction]);

    return (
        <div className="footer">
            <span>You have <span className="pending-todos">{pendingTodosValue}</span> pending tasks</span>
            <button onClick={clearAllClick} id="footer-btn" className={todosValue.length ? 'active' : ''}>Clear All
            </button>
        </div>
    );
};

// TodoInput.propTypes = {
// setSpinner: PropTypes.func,
// refreshState: PropTypes.func,
// }

export default FooterPage;