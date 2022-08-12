const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();


// @route       GET /api/contacts
// @desc        Get all contacts of a user
// @access      private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);

    } catch (err) {
        res.status(500).send("Server error");
    }
});

// @route       POST /api/contacts
// @desc        Add a new contact
// @access      private
router.post('/', [
    auth,
    [
        check('name', "Name is required").not().isEmpty(),
    ],
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, type, phone } = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type, user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route       PUT /api/contacts/:id
// @desc        Update contact
// @access      private
router.put('/:id', auth, async (req, res) => {
    const { name, email, type, phone } = req.body;

    const contactFields = {};
    if (name) contactFields.name = name;
    if (name) contactFields.email = email;
    if (name) contactFields.type = type;
    if (name) contactFields.phone = phone;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "Contact not found !" });
        }

        //make sure user owns the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "You are not authorized" });
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact);

    } catch (err) {
        res.status(500).send("Server error");
    }

});

// @route       DELETE /api/contacts/:id
// @desc        Delete contact
// @access      private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "Contact not found !" });
        }

        //make sure user owns the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "You are not authorized" });
        }

        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed" });

    } catch (err) {
        res.status(500).send("Server error");
    }

});

module.exports = router;