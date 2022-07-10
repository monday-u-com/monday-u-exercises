import actionTypes from "../actions/constants";

const initialState = {
  items: [],
  itemsCount : 0,
};

const itemsEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEMS:
      state.push(action.payload);
      return [...state];

    case actionTypes.DELETE_ITEM:
      return {...state , items: state.items.filter(item => item.itemId !== action.payload),};
    
    case actionTypes.DELETE_ALL:
      return {items:[]};

    case actionTypes.EDIT_ITEM:
      return {...state ,
        items:state.items.map(item => item.itemId === action.itemdId)};
    
    

    
    default:
      return state;
  }
};

export default itemsEntitiesReducer;