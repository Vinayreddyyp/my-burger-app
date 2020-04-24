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

export const logout  = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
}


export const authCheckout = (checkInTime) => {
    return dispatch => {
        setTimeout(() => {
           dispatch(logout())
        }, checkInTime * 1000)
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
            console.log("response of auth", response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(authCheckout(response.data.expiresIn));
        })
            
         .catch(err => {
            console.log("error",err)
             dispatch(authFail(err.response.data.error))
         })
       
    }
}

export const setRedirect = (path) => {
    console.log("jpath of setRedirect", path);
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path,
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId));
                dispatch(authCheckout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }

        }
    }
}
