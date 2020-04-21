import * as actionTypes from '../actions/actionsTypes';
import {
  updateObject
} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  meat: 1.25,
  salad: 0.5,
  cheese: 0.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      }
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      }
      return updateObject(state, updatedState);
}

const removeIngredients = (state, action) => {
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        
      }

      const updatedIngs = updateObject(state.ingredients, updatedIng);

      const updatedS = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      }
      return updateObject(state, updatedS);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
}

const fetchIngredientsFail = (state, action) => {
      return updateObject(state, { error: true,} )
}

const reducer = (state = initialState, action) => {
  console.log("action types", action);
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
    return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
        return removeIngredients(state, action)

    case actionTypes.SET_INGREDIENTS: 
      return setIngredients(state, action)

      case actionTypes.FETCH_INGREDIENTS_FAILED:
       return fetchIngredientsFail(state, action)
        default:
          return state;
  }
};

export default reducer;
