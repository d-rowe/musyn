const express = require('express');
const compositions = require('../../entity/compositions');

module.exports = (PUBLIC_DIR) => (req, res, next) => {
  const { hash } = req.params;
  compositions.getId(hash)
    .then(() => express.static(PUBLIC_DIR)(req, res, next))
    .catch(() => res.status(404).send('Composition not found!'));
};
