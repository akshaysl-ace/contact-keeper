import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import NavBar from './components/layout/NavBar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Alerts from './components/layout/Alerts';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertStsate';
import ContactState from './context/contacts/ContactState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment >
              <NavBar />
              <div className="container">
                <Alerts />
                <Routes>
                  <Route path='/' element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  } />
                  <Route path='/login' element={<Login />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
