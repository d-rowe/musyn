/* eslint-disable class-methods-use-this */
import { Transport } from 'tone';
import instrument from './instrument';
import globalScore from '../../model/score';

class Playback {
  schedule() {
    const score = globalScore.getNotes();
    const measures = Object.keys(score);

    let lastMeasure;
    measures.forEach((measureId) => {
      const measure = score[measureId];
      lastMeasure = parseInt(measureId, 10) + 1;
      const noteStarts = Object.keys(measure);

      noteStarts.forEach((tick) => {
        const beat = Math.floor(parseInt(tick, 10) / 1024);
        const subdivision = (tick % 1024) / 256;
        const timeStr = `${measureId}:${beat}:${subdivision}`;

        const { duration } = measure[tick];
        const durStr = `0:0:${duration / 256}`;

        Transport.schedule(() => {
          const { pitch } = measure[tick];
          instrument.play(pitch, durStr);
        }, timeStr);
      });
    });

    Transport.schedule(() => {
      Transport.stop();
    }, `${lastMeasure}:0:0`);
  }

  start() {
    this.schedule();
    Transport.start();
  }

  stop() {
    Transport.stop();
  }
}

export default new Playback();
