import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail= (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const logOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkTimeOut = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logOut());
        }, expirationTime*1000)
    }
}
export const auth = (email,password,isignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData= {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMGROjZbWNadYuc1Tdg79QKP3pFLOx71g';
        if (!isignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMGROjZbWNadYuc1Tdg79QKP3pFLOx71g';
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkTimeOut(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token= localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date() ){
                const userId= localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            } else {
                dispatch(logOut());
            }
            
        }
        
    }
}