import axios from 'axios';
import messenger from '../controller/messenger';
import instrument from '../controller/playback/instrument';


// TODO: Update score data on note add
class Score {
  constructor() {
    this.score = {};
    this.measureViews = {};

    this.update();
    messenger.onUpdate(() => this.update());
  }

  update() {
    // TODO: use composition model or something better
    const compositionHash = window.location.pathname.replace('/compositions/', '');

    return axios.get(`/api/score/${compositionHash}`)
      .then((response) => response.data)
      .then((score) => {
        this.score = score;
        this.rerender();
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
