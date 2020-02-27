import * as actionTypes from './action';

const inistialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
      totalPrice: 4,
};

const INGREDIENT_PRICES = {
   meat: 1.25,
   salad: 0.5,
   cheese: 0.3,
   bacon: 0.7
};

const reducer = (state = inistialState, action) => {
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
            default:
                return state;
      }
};

export default reducer;