import {
    ADD_CONTACT, CLEAR_CURRENT,
    DELETE_CONTACT, FILTER_CONTACTS,
    SET_CURRENT, UPDATE_CONTACT, CLEAR_FILTER
} from './../types';

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, payload]
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === payload.id ? payload : contact)
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== payload)
            };

        case SET_CURRENT:
            return {
                ...state,
                current: payload
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };

        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };

        default:
            return state;
    }
};

export default reducer;