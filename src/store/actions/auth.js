import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }      
}


export const auth = (email,password, isSignUp) => {

    return dispatch => {
        dispatch(authStart());
        const authObj = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        debugger;
        let Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDUzm-auakzxH4oqw30kfJcdeKgk-mXkg';
        if (!isSignUp) {
            Url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDUzm-auakzxH4oqw30kfJcdeKgk-mXkg';
        }
        axios.post(Url, authObj)
        .then(response => {
            console.log("response of auth", response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
        })
            
         .catch(err => {
            console.log("error",err)
             dispatch(authFail(err.response.data.error))
         })
       
    }
}
