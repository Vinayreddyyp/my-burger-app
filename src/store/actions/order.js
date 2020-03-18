import * as actionTypes from './actionsTypes';
import Axios from '../../axiosOrder';


export const purchaseBurgerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}
export const purchaseBurgerFailure = (error) => {
   return {
       type: actionTypes.PURCHASE_BURGER_FAIL,
       error: error
   }
}

export const purchseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchseBurgerStart())
        Axios.post('/order.json', orderData)
        .then(response => {
            dispatch (purchaseBurgerSucess(response.data, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailure(error))
        })
    }
}