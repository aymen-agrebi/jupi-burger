import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngrediant = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngrediant = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () =>{
    return dispatch => {
        axios.get('https://jupi-burger-default-rtdb.europe-west1.firebasedatabase.app/ingrediants.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientFailed());
        });
    }
}

/*
export const onSetAuthRedirectPath = (path) =>{

}
*/