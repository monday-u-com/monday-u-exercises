import actionsTypes from "./actions/constants";
import { toast } from "react-toastify";
import {
    fetchItems,
    createItem,
    deleteItem,
    updateStatus,
    editTaskName,
    deleteAllItems,
  } from "../../itemClient";
import {
    showLoaderAction,
    hideLoaderAction,
    showClearButtonAction,
    hideClearButtonAction,
  } from "./itemsViewsActions";

  const addItem = (item) => ({
    type : actionsTypes.ADD_ITEMS,
    item:item
});

const deleteOneItem = (itemId) => ({
        type : actionsTypes.DELETE_ITEM,
        payload: itemId,
})

const deleteAll = () => ({
    type: actionsTypes.DELETE_ALL
});

const update = (item) => ({
    type: actionsTypes.UPDATE,
    item,
  });
  
const editItem = (itemId,newName) =>({
    type: actionsTypes.EDIT_ITEM,
    itemId: itemId,
    payload: newName,
});


export const addAction = (item) =>{
    return async (dispatch) =>{
        const exsitItems = await createItem(item.item);
        if (Array.isArray(exsitItems)) {
            exsitItems.forEach((element) => {
            dispatch(addItem(exsitItems));
              toast(`"${element.itemName}" added successfully`);
            });
          } else {
            dispatch(addItem(exsitItems));
            toast(`"${exsitItems.item}" added successfully`);
          }
        };
      };
        

export const getAction = () => {
    return async (dispatch) => {
      const items = await fetchItems();
  
      if (items.item.length > 0) {
        dispatch(showClearButtonAction());
      }
  
      dispatch(addItem(items.item));
    };
  };

export const deleteAction = (itemId ,item) => {
    return async (dispatch) => {
        await deleteItem(item.item);
        dispatch(deleteOneItem(item));
        toast(`"${item.item}" deleted successfully`);
      };
    };
 


export const clearAllAction = () => {
    return async (dispatch) =>{
        dispatch(hideClearButtonAction());
        
        dispatch(deleteAll());
    };
};

export const editItemAction = (itemId, newName) => {
  return async (dispatch) => {
   
    const itemNewName = await editTaskName(itemId, newName);
    dispatch(editItem(itemId,newName))
    
  };
};

export const updateItemAction = (item) => {
    return async (dispatch) => {
      await updateStatus(item);
      dispatch(update(item));
      toast(`"${item.itemName}" updated successfully`);
    };
  };
  

// instead of calling this method
    // create action that handle this
    // dispatch('createItemLoading')
    // dispatch('createIteFailed')
    // dispatch('createItemSuccess',response.json())
    // dispatch('createIteFailed')
    // reduce ->switch(action.type)  return {...state, pokemonsFailed: true, isPokemonLoading:false}
    // reducer -> switch(action.type) { return {...state, pokemons: item.payload, isPokemonLoading:false}}
    
        // dispatch(createItemLoading)
        // pokemonsReducer = queryselectorstate=>state.poke;
        // {isPokemonLoading, pokemons} = pokemonsReducer;
        // isPokemonLoading ? <spinner></spinner> :
        // isPokemonFailed ? <h1>Failed get pokemons</h1> :
        // pokmeons.forEach(p => <h1>p.name</h1>)