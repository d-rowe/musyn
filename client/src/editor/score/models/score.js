import axios from 'axios';
import socket from './socket';
import { playNote } from './audio';

// TODO: Implement note model
class Score {
  constructor() {
    this.score = {};
    this.measureViews = {};

    socket.on.update = () => this.update();
  }

  update() {
    return new Promise((resolve, reject) => {
      axios.get('/api/score')
        .then((response) => response.data)
        .then((scoreDat) => {
          this.score = scoreDat;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  remove(note) {
    const { measure, start, pitch } = note;
    const measureEntries = this.score[measure];

    if (measureEntries === undefined || measureEntries[start] === undefined) {
      return false; // No note to remove
    }

    const notes = measureEntries[start];

    for (let i = 0; i < notes.length; i += 1) {
      if (notes[i].pitch === pitch) {
        notes.splice(i, 1);
        return true;
      }
    }

    // TODO: Remove measure, start entry if necessary

    return false;
  }

  add(note) {
    const { measure, start, pitch } = note;

    if (this.score[measure] === undefined) {
      this.score[measure] = { [start]: undefined };
    } else {
      this.score[measure][start] = undefined;
    }

    this.score[measure][start] = { ...note };

    playNote(pitch);
    // TODO: Send socket message
    this.measureViews[measure].rerender();
  }

  registerMeasureView(measure, view) {
    this.measureViews[measure] = view;
  }

  getMeasure(measure) {
    return this.score[measure] || {};
  }

  getNotes() {
    return this.score;
  }
}

export default new Score();
