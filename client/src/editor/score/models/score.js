import axios from 'axios';
import socket from './socket';
import { playNote } from './audio';

class Score {
  constructor() {
    this.notes = {};

    socket.on.update = () => this.update();
  }

  update() {
    return new Promise((resolve, reject) => {
      axios.get('/api/score')
        .then((response) => response.data)
        .then((scoreDat) => {
          this.notes = scoreDat;
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  getNotes() {
    return { ...this.notes };
  }

  notesAtIndex(tick) {
    const beatPitches = this.notes[tick];

    if (beatPitches !== undefined) {
      return [...beatPitches];
    }

    return [];
  }

  hasNoteAtIndex(notename, tick) {
    const beatPitches = this.notes[tick];

    if (beatPitches === undefined) return false;
    return beatPitches.includes(notename);
  }

  removeNote(notename, tick) {
    const noteIndex = this.notes[tick].indexOf(notename);

    if (noteIndex !== -1) {
      this.notes[tick].splice(noteIndex, 1);
      socket.sendNoteDelete(notename, tick);
      return true;
    }

    return false;
  }

  addNote(notename, tick) {
    console.log(this.notes);
    const beatNotes = this.notes[tick];

    if (this.hasNoteAtIndex(notename, tick)) {
      this.removeNote(notename, tick);
      return false;
    }

    if (beatNotes === undefined) {
      this.notes[tick] = [notename];
    } else {
      beatNotes.push(notename);
    }


    playNote(notename);
    socket.sendNoteCreate(notename, tick);
    return true;
  }
}

export default new Score();
