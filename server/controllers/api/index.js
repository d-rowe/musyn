const express = require('express');
const score = require('../../models/score');

const router = express.Router();

router.get('/score', (req, res) => {
  score.get()
    .then((scoreDat) => res.status(200).send(scoreDat))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
