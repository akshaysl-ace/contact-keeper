import React, { useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';
import ContactFilter from './../../context/contacts/ContactFilter';

const Home = () => {

    const authCtx = useContext(authContext);

    useEffect(() => {
        authCtx.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;