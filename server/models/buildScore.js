module.exports = (editHistory) => {
  const score = {};

  editHistory.forEach((edit) => {
    const { action, notename, beat } = edit;

    const beatEntry = score[beat];

    if (beatEntry === undefined) {
      if (action === 'create') {
        score[beat] = [notename];
      }
    } else {
      const noteIndex = beatEntry.indexOf(notename);

      if (noteIndex === -1) {
        if (action === 'create') {
          score[beat].push(notename);
        }
      } else if (action === 'delete') {
        score[beat].splice(noteIndex, 1);
        if (score[beat].length === 0) {
          delete score[beat];
        }
      }
    }
  });

  return score;
};
