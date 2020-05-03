/* eslint-disable no-param-reassign */
const Note = require('../../../../lib/note');


// Remove notes that overlap with an incoming edit
const overwriteDelete = (score, note) => {
  const { measure, start, end } = note;
  const measureScore = score[measure];

  if (!measureScore) return; // No entry yet for this measure

  const noteStartsArr = Object.keys(measureScore);

  for (let i = 0; i < noteStartsArr.length; i += 1) {
    const currStart = parseInt(noteStartsArr[i], 10);
    if (currStart >= end) break;

    const { end: currEnd } = measureScore[currStart];

    // Delete note if it will be overwritten by an incoming note
    if (
      (start >= currStart && start < currEnd)
      || (end > currStart && end <= currEnd)
    ) {
      delete score[measure][currStart];

      // Delete measure if now empty
      if (Object.keys(score[measure]).length === 0) {
        delete score[measure];
      }
    }
  }
};

const compileEdits = (currentScore, edits) => {
  const score = { ...currentScore };
  let lastEditId;

  edits.forEach((edit) => {
    lastEditId = edit.id;
    const {
      action,
      pitch,
      measure,
      start,
      duration,
      uuid,
    } = edit;

    if (action === 'create') {
      const startInt = parseInt(start, 10);
      const measureInt = parseInt(measure, 10);
      const durationInt = parseInt(duration, 10);

      const note = new Note({
        pitch,
        start: startInt,
        measure: measureInt,
        duration: durationInt,
        author: uuid,
      });

      overwriteDelete(score, note);

      if (score[measure] === undefined) {
        score[measure] = { [start]: note };
        return;
      }

      score[measure][start] = note;
    }

    if (action === 'delete') {
      if (score[measure] === undefined) return;
      if (score[measure][start] === undefined) return;

      delete score[measure][start];

      if (score[measure] === undefined) {
        delete score[measure];
      }
    }
  });

  return { editId: lastEditId, score };
};

module.exports = compileEdits;
