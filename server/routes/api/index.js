const express = require('express');
const score = require('../../controllers/score');
const compositions = require('../../controllers/score/compositions');

const router = express.Router();

router.get('/score', (req, res) => {
  score.get()
    .then((scoreDat) => res.status(200).send(scoreDat))
    .catch((err) => res.status(500).send(err));
});

router.post('/compositions/create', (req, res) => {
  compositions.create()
    .then((hash) => res.status(201).send(hash))
    .catch(() => res.status(500).send());
});

module.exports = router;
