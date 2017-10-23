import { combineReducers } from 'redux'
import locationReducer from './location'


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    folder: loadFolder,
    catalog: loadCatalog
  })
}

/*
 Update selected folder
 */
function loadFolder(state = {files:[]}, action){
  return state;
}

/*
 Update selected catalog
 */
function loadCatalog(state = {folders:[]}, action){
  return state;
}

export default makeRootReducer
