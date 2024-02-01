// ici le "chef des reducers", celui qui affecte chaque tiroir à un reducer
// (qui donne les noms aux tiroirs)
import { combineReducers } from 'redux';

// on importe les reducers
import recipesReducer from './recipes';
import userReducer from './user';

// lien entre les tiroirs et les reducers
const rootReducer = combineReducers({
  // nom du tiroir : nom du reducer qui s'en occupe
  recipes: recipesReducer,
  user: userReducer,
});

export default rootReducer;
