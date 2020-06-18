const edits = require('./edit');
const snapshot = require('./snapshot');
const compositions = require('./composition');

class Score {
  static async createNote(uuid, compositionHash, pitch, measure, tick, duration) {
    const action = 'create';
    const compositionId = await compositions.getId(compositionHash);

    await edits.register(uuid, compositionId, action, pitch, measure, tick, duration);
    await snapshot.update(compositionId);
  }

  static async deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    await edits.register(uuid, action, pitch, measure, tick);
    await snapshot.update();
  }

  static undo() {
    return Promise.all([edits.undo(), snapshot.undo()]);
  }

  static get(hash) {
    return snapshot.get(hash)
      .then((result) => result.score);
  }
}

module.exports = Score;
