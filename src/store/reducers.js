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
function loadFolder(state = [], action){
  if ( action.type === 'FOLDER'){
    debugger;
    return action.files;
  }
  return state;
}

/*
 Update selected catalog
 */
function loadCatalog(state = {folders:[]}, action){
  if ( action.type === 'CATALOG'){
    return action.folders;
  }else{
    return state;
  }
}

export default makeRootReducer
