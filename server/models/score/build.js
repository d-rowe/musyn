module.exports = (editHistory) => {
  const score = {};

  editHistory.forEach((edit) => {
    const {
      action,
      pitch,
      measure,
      tick,
      duration,
    } = edit;

    if (action === 'create') {
      if (score[measure] === undefined) {
        score[measure] = { [tick]: { pitch, duration } };
        return;
      }

      score[measure][tick] = { pitch, duration };
    }

    if (action === 'delete') {
      if (score[measure] === undefined) return;

      if (score[measure][tick] === undefined) return;

      delete score[measure][tick];

      if (score[measure] === undefined) {
        delete score[measure];
      }
    }
  });

  return score;
};
