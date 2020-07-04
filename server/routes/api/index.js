const router = require('express').Router();
const composition = require('../../controller/composition');
const score = require('../../controller/score');


router.get('/scores/:hash', score.get);
router.get('/compositions', composition.count);
router.get('/compositions/:hash', composition.get);
router.post('/compositions', composition.add);
router.put('/compositions/:hash', composition.changeTitle);

module.exports = router;
