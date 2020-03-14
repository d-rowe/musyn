import axios from 'axios';
import socket from './socket';
import { playNote } from './audio';

class Score {
  constructor() {
    this.score = {};

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

  remove(measure, tick, pitch) {
    const currentMeasure = this.score[measure];
    if (currentMeasure === undefined) return false;

    const noteArray = currentMeasure[tick];
    if (noteArray === undefined) return false;

    for (let i = 0; i < noteArray.length; i += 1) {
      const note = noteArray[i];

      if (pitch === note.pitch) {
        if (noteArray.length === 1) {
          delete currentMeasure[tick];

          const isMeasureEmpty = Object.keys(currentMeasure).length === 0;

          if (isMeasureEmpty) {
            delete this.score[measure];
          }
        } else {
          noteArray.splice(i, 1);
        }
        return true;
      }
    }

    return false;
  }

  add(measure, tick, pitch, duration) {
    const currentMeasure = this.score[measure];
    const entry = { pitch, duration };

    if (currentMeasure === undefined) {
      this.score[measure] = { [tick]: [entry] };
    } else {
      const currentTick = currentMeasure[tick];

      if (currentTick === undefined) {
        this.score[measure][tick] = [entry];
      } else {
        currentTick.push(entry);
      }
    }

    playNote(pitch);
    socket.sendNoteCreate(pitch, tick);
  }
}

export default new Score();
