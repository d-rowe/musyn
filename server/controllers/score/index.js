const edits = require('./edits');
const scoreCache = require('./scoreCache');
const compositions = require('./compositions');

class Score {
  static async createNote(uuid, compositionHash, pitch, measure, tick, duration) {
    const action = 'create';
    const compositionId = await compositions.getId(compositionHash);

    await edits.register(uuid, compositionId, action, pitch, measure, tick, duration);
    await scoreCache.update(compositionId);
  }

  static async deleteNote(uuid, pitch, measure, tick) {
    const action = 'delete';
    await edits.register(uuid, action, pitch, measure, tick);
    await scoreCache.update();
  }

  static undo() {
    return Promise.all([edits.undo(), scoreCache.undo()]);
  }

  static get() {
    return scoreCache.get()
      .then((result) => result.score);
  }
}

module.exports = Score;
