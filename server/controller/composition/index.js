const express = require('express');
const composition = require('../../entity/composition');

module.exports = (PUBLIC_DIR) => (req, res, next) => {
  const { hash } = req.params;
  composition.getId(hash)
    .then(() => express.static(PUBLIC_DIR)(req, res, next))
    .catch(() => res.status(404).send('Composition not found!'));
};
