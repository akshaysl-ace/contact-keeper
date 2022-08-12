const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = express.Router();

// @route       POST /api/users
// @desc        Register a user
// @access      public
router.post('/', [
    check('name', "Please provide Name").not().isEmpty(),
    check('email', "Email must be valid").isEmail(),
    check('password', "Password shoud be between 6 and 12 characters").isLength({ min: 6, max: 12 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            name, email, password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

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