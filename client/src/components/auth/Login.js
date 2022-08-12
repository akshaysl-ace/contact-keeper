import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Login = (props) => {

    const navigate = useNavigate();

    const alertCtx = useContext(alertContext);
    const authCtx = useContext(authContext);

    const { login, clearErrors, error, isAuthenticated } = authCtx;
    const { setAlert } = alertCtx;

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const { email, password } = user;

    const onChange = e => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please fill all the fields", "danger", 3000);
        } else {
            login({
                email, password
            });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error === "Invalid credentials !") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    return (
        <div className='form-container'>
            <h1>
                User <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={onChange} required />
                </div>
                <input type="submit" value="Login" className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default (Login);