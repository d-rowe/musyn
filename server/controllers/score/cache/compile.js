const Note = require('../../../../lib/note');


// TODO: Handle overwrites
class CacheCompile {
  static compileEdits(currentScore, edits) {
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
  }
}

module.exports = CacheCompile;
