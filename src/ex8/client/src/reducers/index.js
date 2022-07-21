import itemsEntities from "./items-entities-reducer";
import itemsView from "./items-view-reducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  itemsEntities,
  itemsView
});

export default allReducers;