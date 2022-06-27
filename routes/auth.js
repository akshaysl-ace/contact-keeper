const express = require('express');
const router = express.Router();


// @route       GET /api/auth
// @desc        Get a authenticated user
// @access      private
router.get('/', (req, res) => {
    res.send("get a logged in user");
});

// @route       POST /api/auth
// @desc        Auth a user and get token
// @access      public
router.post('/', (req, res) => {
    res.send("log in the user");
});

module.exports = router;