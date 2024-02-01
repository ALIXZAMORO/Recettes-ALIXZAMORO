// Attention au PIEGE : le reducer ne sait pas qu'il gère juste un tiroir et pas le state
// entier

import { SET_RECIPES } from '../actions/recipes';

// => "list" est accessible avec state.recipes.list, pas state.list
export const initialState = {
  list: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        list: action.payload.recipes,
      };

    default:
      return state;
  }
};

export default reducer;
