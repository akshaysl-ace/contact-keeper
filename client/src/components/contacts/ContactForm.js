import React, { useContext, useEffect, useState } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {

    const context = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = context;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal"
            });
        }
    }, [context, current]);

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal"
    });

    const { name, email, phone, type } = contact;

    const onInputChange = e => setContact({
        ...contact,
        [e.target.name]: e.target.value
    });

    const clearAll = () => clearCurrent();

    const onSubmit = e => {
        e.preventDefault();
        if (current == null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? "Edit Contact" : "Add Contact"}</h2>
            <input type="text" name='name' placeholder='Name' value={name} onChange={onInputChange} />
            <input type="email" name='email' placeholder='Email' value={email} onChange={onInputChange} />
            <input type="text" name='phone' placeholder='Phone' value={phone} onChange={onInputChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onInputChange} /> Personal {" "}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onInputChange} /> Professional {" "}
            <div>
                <input type="submit" value={current ? "Update Contact" : "Add Contact"} className="btn btn-primary btn-block" />
            </div>
            {current && (<button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>)}
        </form>
    );
}

export default ContactForm;