/* eslint-disable no-console */
import axios from 'axios';
import view from '../views/score';
import socket from './socket';

class Score {
  constructor(measures) {
    this.length = measures * 4;
    this.notes = {};

    socket.on.update = () => this.update();
  }

  update() {
    return new Promise((resolve, reject) => {
      axios.get('/api/score')
        .then((res) => res.data)
        .then((scoreDat) => {
          this.notes = scoreDat;
          view.rerender();
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  notesAtIndex(beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes !== undefined) {
      return [...notes];
    }

    return [];
  }

  hasNoteAtIndex(notename, beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes === undefined) return false;

    return notes.includes(notename);
  }

  addNote(notename, beatIndex) {
    const notes = this.notes[beatIndex];

    if (notes === undefined) {
      this.notes[beatIndex] = [notename];
      socket.sendNoteCreate(notename, beatIndex);
      return true;
    }

    if (this.hasNoteAtIndex(notename, beatIndex)) {
      this.removeNote(notename, beatIndex);
      return false;
    }

    notes.push(notename);
    socket.sendNoteCreate(notename, beatIndex);
    return true;
  }

  removeNote(notename, beatIndex) {
    const noteIndex = this.notes[beatIndex].indexOf(notename);

    if (noteIndex !== -1) {
      this.notes[beatIndex].splice(noteIndex, 1);
      socket.sendNoteDelete(notename, beatIndex);
      return true;
    }

    return false;
  }
}

export default Score;
