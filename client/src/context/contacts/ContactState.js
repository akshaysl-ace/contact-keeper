import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from '/contactReducer';
import {
    ADD_CONTACT, CLEAR_CURRENT,
    DELETE_CONTACT, FILTER_CONTACTS,
    SET_CURRENT, UPDATE_CONTACT, CLEAR_FILTER
} from './../types';


const ContactState = props => {
    const initialState = {
        contacts: []
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

}