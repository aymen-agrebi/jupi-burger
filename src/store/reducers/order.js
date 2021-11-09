import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utulity';

const initialState = {
    orders : [],
    loading: false
}

const purchaseBurgerSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData,{
        id: action.orderId,
        price: state.orders.price
    });
    return updateObject(state,{
        orders : state.orders.concat(newOrder),
        loading: false,
        purchased: true
    });
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT : return updateObject(state, {purchased: false});
        case actionTypes.PURCHAE_BURGER_START : return updateObject(state,{loading: true});
        case  actionTypes.PURCHAE_BURGER_SUCCESS : return purchaseBurgerSuccess(state,action);
        case  actionTypes.PURCHAE_BURGER_FAIL : return updateObject(state,{loading: false});
        case actionTypes.FETCH_ORDERS_START : return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS :return updateObject(state, {orders: action.orders,loading:false});
        case actionTypes.FETCH_ORDERS_FAILED : return updateObject(state, {loading:false});
        default : return state;
    }
}

export default reducer;