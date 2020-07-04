const edit = require('../edit');
const snapshot = require('../snapshot');
const composition = require('../composition');

class Score {
  static async createNote(uuid, compositionHash, pitch, measure, tick, duration) {
    const action = 'create';
    const compositionId = await composition.getId(compositionHash);

    await edit.register(uuid, compositionId, action, pitch, measure, tick, duration);
    await snapshot.update(compositionId);
  }

  static async deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    await edit.register(uuid, action, pitch, measure, tick);
    await snapshot.update();
  }

  static undo(compositionHash) {
    return edit.undo(compositionHash);
  }

  static get(hash) {
    return snapshot.get(hash)
      .then((result) => result.score);
  }
}

module.exports = Score;
