const express = require('express');
const composition = require('../entity/composition');

module.exports = {

  get: (req, res) => {
    const { hash } = req.params;
    composition.get(hash)
      .then((comp) => res.status(200).send(comp))
      .catch(() => res.sendStatus(500));
  },

  add: (req, res) => {
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
  },

  changeTitle: (req, res) => {
    const { hash } = req.params;
    const title = req.body.title || undefined;
    composition.updateTitle(hash, title)
      .then(() => res.sendStatus(202))
      .catch(() => res.sendStatus(500));
  },

  serve: (PUBLIC_DIR) => (req, res, next) => {
    const { hash } = req.params;
    composition.getId(hash)
      .then(() => express.static(PUBLIC_DIR)(req, res, next))
      .catch(() => res.status(404).send('Composition not found!'));
  },

  count: (req, res) => {
    composition.count()
      .then((count) => res.status(200).send(count))
      .catch((err) => res.status(500).send(err));
  },

};
