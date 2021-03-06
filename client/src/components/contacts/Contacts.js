import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {

    const context = useContext(ContactContext);

    const { contacts, filtered } = context;

    if (contacts.length === 0) {
        return <h4>Please add a contact...</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem key={contact.id} contact={contact} />
                        </CSSTransition>))
                    : contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames="item">
                            <ContactItem contact={contact} key={contact.id} />
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;