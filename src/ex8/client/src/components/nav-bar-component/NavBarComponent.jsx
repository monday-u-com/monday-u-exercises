import { useNavigate } from "react-router-dom";
import { Tab, TabList } from "monday-ui-react-core";
import { ROUTES } from "./consts"
import styles from "../todo-app-container/TodoAppContainer.module.scss";

function NavBarComponent() {
  const navigate = useNavigate();

  return (
    <TabList tabType="stretched" className={styles.tabsList}>
      {ROUTES.map(({ name, route, key }) => {
        return (
          <Tab key={key} onClick={() => navigate(route)}>
            {name}
          </Tab>
        );
      })}
    </TabList>
  );
}

export default NavBarComponent
