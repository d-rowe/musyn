const router = require('express').Router();
const controller = require('../../controller/auth');

router.get('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/google', controller.google.authenticate);
router.get('/google/redirect', ...controller.google.redirect);
router.get('/github', controller.github);

module.exports = router;
