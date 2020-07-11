const router = require('express').Router();
const { logout, google, github } = require('../controller/auth');

router.get('/logout', logout);

// Google
router.get('/google', google.authenticate);
router.get('/google/redirect', google.middleware, google.redirect);

// Github
router.get('/github', github.authenticate);
router.get('/github/redirect', github.middleware, github.redirect);

module.exports = router;
