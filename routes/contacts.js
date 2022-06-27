const express = require('express');
const router = express.Router();


// @route       GET /api/contacts
// @desc        Get all contacts of a user
// @access      private
router.get('/', (req, res) => {
    res.send("get all contacts");
});

// @route       POST /api/contacts
// @desc        Add a new contact
// @access      private
router.post('/', (req, res) => {
    res.send("Add a contact");
});

// @route       PUT /api/contacts/:id
// @desc        Update contact
// @access      private
router.put('/:id', (req, res) => {
    res.send("update contact");
});

// @route       DELETE /api/contacts/:id
// @desc        Delete contact
// @access      private
router.delete('/:id', (req, res) => {
    res.send("delete contact");
});

module.exports = router;