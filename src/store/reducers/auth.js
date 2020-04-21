import * as  actionsTypes  from '../actions/actionsTypes';
import { updateObject } from '../utility';

const intialState = {
    idToken: null,
    userId: null,
    loading: false,
    error: null,
    authRedirect: '/'
   
} 

const authStart = (state, action) =>  {
     return updateObject(state, {error: null, loading: true})
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,

    })
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const authLogout = (state, action) => {
    return updateObject(state, {error: null, loading: false,idToken: null,userId: null})
}

const setAuthRedirect = (state, action) => {
    return updateObject(state, {authRedirect: action.path})
}

const  reducer = (state = intialState, action) => {
      switch(action.type) {
          case actionsTypes.AUTH_START: return authStart(state, action)
          case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action)
          case actionsTypes.AUTH_FAIL: return authFail(state, action)
          case actionsTypes.AUTH_LOG_OUT: return authLogout(state, action)
          case actionsTypes.AUTH_REDIRECT: return setAuthRedirect(state, action)
          default:
              return state
      }
}

export default reducer 