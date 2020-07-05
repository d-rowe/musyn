const router = require('express').Router();
const { login, logout, google } = require('../../controller/auth');

router.get('/login', login);
router.get('/logout', logout);
router.get('/google', google.authenticate);
router.get('/google/redirect', google.middleware, google.redirect);

module.exports = router;
