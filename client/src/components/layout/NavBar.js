import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { useContext } from 'react';

const NavBar = ({ title, icon }) => {
    const navigate = useNavigate();
    const authCtx = useContext(authContext);
    const { isAuthenticated, logout, user } = authCtx;

    const onLogout = () => {
        logout();
        navigate('/login');
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name} </li>
            <li>
                <a onClick={onLogout} href="/login">
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Log Out</span>
                </a>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/">Home</Link>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

NavBar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}

export default NavBar;