const router = require('express').Router();
const composition = require('../../controller/composition');
const score = require('../../controller/score');
const tones = require('../../controller/tones');

router.get('/scores/:hash', score.get);
router.get('/compositions', composition.count);
router.get('/compositions/:hash', composition.get);
router.post('/compositions', composition.add);
router.put('/compositions/:hash', composition.changeTitle);
router.get('/username', (req, res) => res.send(req.user ? req.user.display_name : null));
router.get('/tones', tones.get);

module.exports = router;
