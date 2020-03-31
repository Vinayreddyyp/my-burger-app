import * as  actionTypes from '../actions/actionsTypes'

const initialState = {
     
    orders : [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    console.log("action in reducers ", action);
    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            return {
                 ...state,
                 purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
            
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log("action orderId", action.orderId);
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
        return {
            ...state,
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder)
        }

        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: false
            }

        case actionTypes.FETCH_ORDER_SUCESS:
            return {
                ...state,
                orders: action.orders,

            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
               loading: false,     
            }
        default:
            return state;
    }
}


export default reducer;




