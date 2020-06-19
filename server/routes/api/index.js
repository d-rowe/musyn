const express = require('express');
const score = require('../../entity');
const compositionController = require('../../controller/composition');
const composition = require('../../entity/composition');

const router = express.Router();

// TODO: Move logic to controller
router.get('/score/:hash', (req, res) => {
  const { hash } = req.params;

  score.get(hash)
    .then((scoreDat) => res.status(200).send(scoreDat))
    .catch((err) => res.status(500).send(err));
});

router.get('/compositions', compositionController.count);

// TODO: Move logic to controller
router.get('/compositions/:hash', (req, res) => {
  const { hash } = req.params;
  composition.get(hash)
    .then((comp) => res.status(200).send(comp))
    .catch(() => res.sendStatus(500));
});

// TODO: Move logic to controller
router.post('/compositions', (req, res) => {
  const title = req.body.title || undefined;
  composition.create(title)
    .then((hash) => {
      res
        .status(201)
        .send({ hash });
    })
    .catch(() => res
      .status(500)
      .send('There was a problem creating the composition'));
});

router.put('/compositions/:hash', (req, res) => {
  const { hash } = req.params;
  const title = req.body.title || undefined;
  composition.updateTitle(hash, title)
    .then(() => res.sendStatus(202))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
