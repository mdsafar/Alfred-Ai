import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS } from '../constants/userConstants'

let parsedUser;
const userFromLocalStorage = localStorage.getItem('user')

if (userFromLocalStorage) {
    parsedUser = JSON.parse(userFromLocalStorage)
}



const initialState = {
    user: parsedUser,
    isAuthenticated: !!parsedUser,
    loading: false
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false,
            };

        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
