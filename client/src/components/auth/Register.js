import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const Register = (props) => {
    const navigate = useNavigate();
    const authCtx = useContext(authContext);
    const alertCtx = useContext(alertContext);

    const { register, clearErrors, error, isAuthenticated } = authCtx;
    const { setAlert } = alertCtx;

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = user;

    const onChange = e => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please fill all the fields !", "danger", 3000);
        } else if (password !== password2) {
            setAlert("Passwords do not match !", "danger", 3000);
        } else {
            register({
                name, email, password
            });
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error === "User already exists") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={onChange} required
                        minLength={"8"} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" id="password2" value={password2} onChange={onChange} required
                        minLength={"8"} />
                </div>
                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register;