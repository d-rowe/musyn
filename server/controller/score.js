const score = require('../entity');

module.exports = {

  get: (req, res) => {
    const { hash } = req.params;

    score.get(hash)
      .then((scoreDat) => res.status(200).send(scoreDat))
      .catch((err) => res.status(500).send(err));
  },

};
