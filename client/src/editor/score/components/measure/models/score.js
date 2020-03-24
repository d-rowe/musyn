import globalScore from '../../../models/score';
import vexNote from './vexNote';

// TODO: Implement cursors
class Score {
  constructor(measure) {
    this.score = globalScore.getMeasure(measure);

    this.getAvailableSpaces();
  }

  build() {
    const built = { ...this.score };

    const addRests = (start, targetDuration) => {
      if (targetDuration < 1) return;

      const end = start + targetDuration;
      const targetAvailable = this.isSpaceAvailable(start, end);

      if (targetAvailable) {
        built[start] = { rest: true, start, duration: targetDuration };
      } else {
        const nextTargetDuration = targetDuration / 2;

        addRests(start, nextTargetDuration);
        addRests(start + nextTargetDuration, nextTargetDuration);
      }
    };

    addRests(0, 4096);

    return built;
  }

  tickables() {
    const vexEntries = [];
    const built = this.build();
    const startKeys = Object.keys(built)

    startKeys.forEach((sKey) => {
      const entry = built[sKey];

      if (entry.rest) {
        vexEntries.push(vexNote({ isRest: true, beatDuration: (entry.duration / 1024) }));
      } else {
        vexEntries.push(vexNote({ pitches: [entry.pitch], beatDuration: (entry.duration / 1024) }));
      }
    });

    return vexEntries;
  }

  getAvailableSpaces() {
    const space = [];
    const noteStarts = Object.keys(this.score);
    let prevEnd = 0;

    const addSpace = (start, end) => {
      if (end - start > 0) {
        space.push([start, end]);
      }
    };

    noteStarts.forEach((startKey) => {
      const note = this.score[startKey];
      const { start, end } = note;

      addSpace(prevEnd, start); // Space leading note

      prevEnd = end;
    });

    addSpace(prevEnd, 4096); // Space trailing note

    this.availableSpace = space;
    return space;
  }

  isSpaceAvailable(start, end) {
    for (let i = 0; i < this.availableSpace.length; i += 1) {
      const [spaceStart, spaceEnd] = this.availableSpace[i];

      if (start >= spaceStart && end <= spaceEnd) {
        return true;
      }
    }

    return false;
  }
}

export default Score;
