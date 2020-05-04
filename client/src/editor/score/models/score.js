import axios from 'axios';
import messenger from '../controllers/messenger';
import Note from '../../../../../lib/note';
import instrument from '../controllers/playback/instrument';


class Score {
  constructor() {
    this.score = {};
    this.measureViews = {};

    this.update();
    messenger.onUpdate(() => this.update());
  }

  update() {
    return new Promise((resolve, reject) => {
      axios.get('/api/score')
        .then((response) => response.data)
        .then((editHistory) => {
          this.score = editHistory;
          this.rerender();
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  import(editHistory) {
    this.score = {};

    editHistory.forEach((edit) => {
      const {
        pitch,
        measure,
        start,
        duration,
        uuid,
      } = edit;

      const note = new Note({
        pitch,
        start,
        duration,
        measure,
        author: uuid,
      });

      this.add(note);
    });
  }

  remove(note) {
    const { pitch, measure, start } = note;
    const measureEntries = this.score[measure];

    if (measureEntries === undefined || measureEntries[start] === undefined) {
      return false; // No note to remove
    }

    const notes = measureEntries[start];

    for (let i = 0; i < notes.length; i += 1) {
      if (notes[i].pitch === pitch) {
        notes.splice(i, 1);

        messenger.noteDelete(pitch, measure, start);
        return true;
      }
    }

    // TODO: Remove measure, start entry if necessary

    return false;
  }

  add(note) {
    const {
      pitch,
      measure,
      start,
      duration,
    } = note;

    if (this.score[measure] === undefined) {
      this.score[measure] = { [start]: undefined };
    } else {
      this.score[measure][start] = undefined;
    }

    this.score[measure][start] = { ...note };

    instrument.play(pitch);
    messenger.noteCreate(pitch, measure, start, duration);
    this.measureViews[measure].rerender();
  }

  registerMeasureView(measure, view) {
    this.measureViews[measure] = view;
  }

  rerender() {
    const measureIndexes = Object.keys(this.measureViews);

    measureIndexes.forEach((index) => {
      this.measureViews[index].rerender();
    });
  }

  getMeasure(measure) {
    return this.score[measure] || {};
  }

  getNotes() {
    return this.score;
  }
}

export default new Score();
