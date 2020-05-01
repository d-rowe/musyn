const edits = require('./edits');
const buildScore = require('./build');


class Score {
  static createNote(uuid, pitch, measure, tick, duration) {
    const action = 'create';
    return edits.register(uuid, action, pitch, measure, tick, duration);
  }

  static deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    return edits.register(uuid, action, pitch, measure, tick);
  }

  static undo() {
    return edits.undo();
  }

  static get() {
    return new Promise((resolve, reject) => {
      edits.get()
        .then((editHistory) => {
          resolve(buildScore(editHistory));
        })
        .catch(reject);
    });
  }
}

module.exports = Score;
