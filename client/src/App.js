import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import About from './components/pages/About';
import Home from './components/pages/Home';
import ContactState from './context/contacts/ContactState';
import './App.css';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment className="App">
          <NavBar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
