import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from './../../utils/setAuthToken';
import {
    REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT, AUTH_ERROR, CLEAR_ERRORS
} from './../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            });
        }
    }

    // Register user

    const register = async (data) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/users', data, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });

            loadUser();

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // Login user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });

            loadUser();

        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            loadUser,
            register,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;