const router = require('express').Router();
const {
  login, logout, google, github,
} = require('../../controller/auth');

router.get('/login', login);
router.get('/logout', logout);
router.get('/google', google.authenticate);
router.get('/google/redirect', google.middleware, google.redirect);
router.get('/github', github);

module.exports = router;
