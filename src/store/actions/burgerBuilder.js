import * as actionTypes from './actionsTypes';
import axios from '../../axiosOrder';

export const addIngredient = (name) => {
    console.log("name", name);
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredinets = () => {
    return dispatch => {
        axios.get('https://react-my-burger-8b57a.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
           dispatch(fetchIngredientsFailed())
        })
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
