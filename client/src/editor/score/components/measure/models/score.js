import globalScore from '../../../models/score';
import vexNote from './vexNotes';

class Score {
  constructor(measure) {
    this.score = globalScore.getMeasure(measure);
  }

  vex() {
    const vex = [];
    const noteStarts = Object.keys(this.score);
    let prevEnd = 0;

    noteStarts.forEach((startKey) => {
      const note = this.score[startKey];
      const {
        start,
        end,
        duration,
        pitch,
      } = note;
      const leadingRestDuration = start - prevEnd;

      if (leadingRestDuration > 0) {
        vex.push(vexNote({ isRest: true, beatDuration: (leadingRestDuration / 1024) }));
      }

      vex.push(vexNote({ pitches: [pitch], beatDuration: (duration / 1024) }));

      prevEnd = end;
    });

    const trailingRestDuration = 4096 - prevEnd;

    if (trailingRestDuration > 0) {
      vex.push(vexNote({ isRest: true, beatDuration: (trailingRestDuration / 1024) }));
    }

    return vex;
  }
}

export default Score;
