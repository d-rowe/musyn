const express = require('express');
const score = require('../../controllers/score');
const compositions = require('../../controllers/score/compositions');

const router = express.Router();

router.get('/score', (req, res) => {
  score.get()
    .then((scoreDat) => res.status(200).send(scoreDat))
    .catch((err) => res.status(500).send(err));
});

router.get('/compositions/:hash', (req, res) => {
  const { hash } = req.params;
  compositions.get(hash)
    .then((comp) => res.status(200).send(comp))
    .catch(() => res.sendStatus(500));
});

router.post('/compositions', (req, res) => {
  compositions.create()
    .then((hash) => res.status(201).send(hash))
    .catch(() => res.status(500).send());
});

module.exports = router;
