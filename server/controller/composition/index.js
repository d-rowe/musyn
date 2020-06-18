const express = require('express');
const composition = require('../../entity/composition');

module.exports = {

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
