import React, { useContext } from 'react';
import authContext from '../../context/auth/authContext';
import Login from '../auth/Login';

const PrivateRoute = ({ children }) => {

    const authCtx = useContext(authContext);
    const { isAuthenticated, loading } = authCtx;

    if (!isAuthenticated && !loading) {
        return (
            <Login />
        );
    };

    return children;
}

export default PrivateRoute;