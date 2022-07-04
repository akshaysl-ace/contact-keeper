import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    ADD_CONTACT, CLEAR_CURRENT,
    DELETE_CONTACT, FILTER_CONTACTS,
    SET_CURRENT, UPDATE_CONTACT, CLEAR_FILTER
} from './../types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add contact
    const addContact = contact => {
        contact.id = v4();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }

    // Delete contact
    const deleteContact = id => dispatch({ type: DELETE_CONTACT, payload: id });

    // Set current contact
    const setCurrent = contact => dispatch({ type: SET_CURRENT, payload: contact });

    // Clear current contact
    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

    // Update contact
    const updateContact = contact => dispatch({ type: UPDATE_CONTACT, payload: contact });

    // Filter contacts
    const filterContacts = text => dispatch({ type: FILTER_CONTACTS, payload: text });

    // Clear filter
    const clearFilter = () => dispatch({ type: CLEAR_FILTER });


    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    );

};

export default ContactState;