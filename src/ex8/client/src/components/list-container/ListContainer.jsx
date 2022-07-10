import { useEffect, useMemo } from "react";
import {Heading, List, Loader} from "monday-ui-react-core";
import ListControlsConnector from "./list-controls-component/ListControlsConnector";
import ListItemConnector from "./list-item-component/ListItemConnector";
import styles from "./ListContainer.module.scss";

function ListContainer({ items, fetchItems, isLoading, isError }) {

  useEffect(() => {
    // We call here the fetch items action creator that was mapped in the connector into a prop
    fetchItems();
  }, []);

  const itemsList = useMemo(() => {
    // Once the items we'll be returned from the server they'll be updated in the store
    // Then, by mapping the store into props, we'll get here the items and we would be able to display them
    return items.map(({ id, name, status }) => {
      return <ListItemConnector key={id} id={id} name={name} status={!!status} />;
    });
  }, [items]);

  // If the error flag from the store is true then we want to display an error message
  if (isError) {
      return <Heading type={Heading.types.h2} customColor={'red'} value="Error!" ellipsis={false}/>;
  }

  // If the loading flag from the store is true then we want to display a loader
  if (isLoading) {
      return <Loader size={40} />;
  }

  return (
    <div className={styles.container}>
      <ListControlsConnector />
      <List className={styles.list}>
        {itemsList}
      </List>
    </div>
  );
}

export default ListContainer;
