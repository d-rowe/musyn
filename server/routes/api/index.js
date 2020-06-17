const express = require('express');
const score = require('../../entity');
const compositions = require('../../entity/compositions');

const router = express.Router();

// TODO: Move logic to controllers
router.get('/score/:hash', (req, res) => {
  const { hash } = req.params;

  score.get(hash)
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
  const title = req.body.title || undefined;
  compositions.create(title)
    .then((hash) => {
      res
        .status(201)
        .send({ hash });
    })
    .catch(() => res
      .status(500)
      .send('There was a problem creating the composition'));
});

module.exports = router;
