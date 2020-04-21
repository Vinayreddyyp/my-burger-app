import * as actionTypes from './actionsTypes';
import Axios from '../../axiosOrder';


export const purchaseBurgerSucess = (id, orderData) => {
    console.log("purchase burger id", id);
    debugger;
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}
export const purchaseBurgerFailure = (error) => {
    debugger;
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

export const purchaseBurger = (orderData, token) => {
    debugger;
    return dispatch => {
        dispatch(purchseBurgerStart())
        Axios.post('/orders.json?auth=' + token, orderData )
        .then(response => {
            console.log("response", response.data)
            dispatch (purchaseBurgerSucess(response.data.name, orderData));
        })
        .catch(error => {
            console.log("catch", error.orderId);
            dispatch(purchaseBurgerFailure(error))
        })
    }
}

export const purchaseInit = () => {
     return {
         type: actionTypes.PURCHASE_INIT
     }
}

export const fetchOrderSucess = (order) => {
      return {
          type: actionTypes.FETCH_ORDER_SUCESS,
          orders: order
      }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token) => {
    console.log("token for orders ", token);
    return dispatch => {
        Axios.get('./orders.json?auth=' + token)
    .then(res => {
        const fetchOrders = [];
        for(let key in res.data) {
           fetchOrders.push({...res.data[key], id: key})
        }
         dispatch(fetchOrderSucess(fetchOrders)) 
    }).catch(err =>{
       dispatch(fetchOrderFail(err))
       
    })
}
    
}