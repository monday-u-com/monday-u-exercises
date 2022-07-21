import {Heading, Search, ButtonGroup, Button} from "monday-ui-react-core";
import {useCallback} from "react";
import {Route, Routes} from "react-router-dom";
import {ROUTES_MAPPING} from "../nav-bar-component/consts"
import {STATUS_FILTER_OPTIONS} from "../../constants/status-filter-options";
import NavBarComponent from "../nav-bar-component/NavBarComponent"
import ListContainerConnector from "../list-container/ListContainerConnector";
import AboutComponent from "../about-component/AboutComponent";
import styles from "./TodoAppContainer.module.scss";
import {restoreLastDeletedItem} from "../../actions/restore-item-actions";

function TodoList({ search, filterByStatus, restoreLastDeletedItem, isThereItemToRestore }) {
    const onChangeSearchTerm = useCallback((value) => {
        // Here we call the action creator that we mapped in the connector to prop
        search(value);
    }, []);

    const onChangeStatusFilter = useCallback((value) => {
        // Here we call the action creator that we mapped in the connector to prop
        filterByStatus(value);
    }, []);

    return (
        <>
            <Heading type={Heading.types.h2} className={styles.name} value="Todo App" ellipsis={false}/>
            <div className={styles.row}>
                <ButtonGroup groupAriaLabel="filter items by their status" value={STATUS_FILTER_OPTIONS[0].value}
                             options={STATUS_FILTER_OPTIONS} onSelect={onChangeStatusFilter}/>
                {/* Now we can decide whether the button should be disabled or not
                by prop we mapped in the connector from the state */}
                <Button disabled={!isThereItemToRestore} onClick={restoreLastDeletedItem}>Restore last deleted item</Button>
            </div>
            <Search placeholder="Search your todo" onChange={onChangeSearchTerm}/>
            <ListContainerConnector/>
        </>
    );
}

function TodoAppContainer({ search, filterByStatus, restoreLastDeletedItem, isThereItemToRestore }) {
    return (
        <div className={styles.container}>
            <NavBarComponent/>
            <Routes>
                <Route path={ROUTES_MAPPING.TODO_LIST}
                       element={<TodoList search={search} filterByStatus={filterByStatus}
                                          restoreLastDeletedItem={restoreLastDeletedItem}
                                          isThereItemToRestore={isThereItemToRestore}/>}/>
                <Route path={ROUTES_MAPPING.ABOUT} element={<AboutComponent/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
}

export default TodoAppContainer;
