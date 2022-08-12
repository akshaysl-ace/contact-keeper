import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT, AUTH_ERROR, CLEAR_ERRORS
} from './../types';

export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: payload
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export default reducer;