const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');


const router = express.Router();

// @route       GET /api/auth
// @desc        Get a authenticated user
// @access      private
router.get('/', [auth], async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        res.status(500).send("Server error");
    }
});

// @route       POST /api/auth
// @desc        Auth a user and get token
// @access      public
router.post('/', [
    check('email', "Please include a vali email").isEmail(),
    check('password', "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials !" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials !" });
        }

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (error, token) => {
            if (error) {
                throw error;
            }
            res.json({ token });
        });

    } catch (err) {
        res.status(500).send("Server error");
    }

});

module.exports = router;