import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}


const purchaseInIt = (state, action) => {
  return updateObject(state, { purchased: false })
}
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true })
}

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.orderId});

      return updateObject(state, {   loading: false,
          purchased: true,
          orders: state.orders.concat(newOrder)
        })

}

const purchaseBurgerFail = (state, action) => {
  return  updateObject(state, {loading: false,});
}

const fetchOrderStart = (state, action) => {
  return  updateObject(state, {loading: false});
} 

const fetchOrderSuccess = (state, action) => {
    return  updateObject(state, {orders: action.orders, loading:false});
}

   
const reducer = (state = initialState, action) => {
  console.log("action in reducers ", action);
  switch (action.type) {

    case actionTypes.PURCHASE_INIT:
     return purchaseInIt(state, action);
      

    case actionTypes.PURCHASE_BURGER_START:
     return purchaseBurgerStart(state, action);
       

      case actionTypes.PURCHASE_BURGER_SUCCESS:
        console.log("action orderId", action.orderId);
        return purchaseBurgerSuccess(state,action)
        
        case actionTypes.FETCH_ORDER_START:
         return fetchOrderStart(state, action)

          case actionTypes.FETCH_ORDER_SUCESS:
            return fetchOrderSuccess(state,action)
          case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state,action)
              default:
                return state;
  }
}


export default reducer;
