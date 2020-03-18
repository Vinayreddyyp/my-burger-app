import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
      totalPrice: 4,
      error: false
};

const INGREDIENT_PRICES = {
   meat: 1.25,
   salad: 0.5,
   cheese: 0.3,
   bacon: 0.7
};

const reducer = (state = initialState, action) => {
   console.log("action types", action);
      switch(action.type) {
          case actionTypes.ADD_INGREDIENTS:
              return {
                 ...state,
                 ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                 },
                 totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
              }
              case actionTypes.REMOVE_INGREDIENTS:
                    return {
                        ...state,
                        ingredients: {
                           ...state.ingredients,
                           [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                        },
                        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
                     }
               case actionTypes.SET_INGREDIENTS:
                  return {
                     ...state,
                     ingredients: action.ingredients
                  }
                 case actionTypes.FETCH_INGREDIENTS_FAILED:
                    return {
                       ...state,
                       error: true,
                    }
            default:
                return state;
      }
};

export default reducer;