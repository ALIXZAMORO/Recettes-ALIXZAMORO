export const SET_RECIPES = 'SET_RECIPES';

// il faut un payload sur l'action si on a besoin d'une information au niveau du
// reducer ET que cette information n'est pas diponible dans le state

export const setRecipes = (data) => ({
  type: SET_RECIPES,
  payload: {
    recipes: data,
  },
});
