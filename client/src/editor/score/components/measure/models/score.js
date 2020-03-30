import globalScore from '../../../models/score';
import cursors from '../../../models/cursors';
import vexNote from './vexNote';


class Score {
  constructor(measure) {
    // Get notes in the current measure
    this.noteScore = globalScore.getMeasure(measure);

    // Get cursors in the current measure
    this.cursors = cursors.getMeasure(measure);

    // Add cursors to score, replace notes if time overlap
    this.cursorScore = this.cursorScore();

    this.getAvailableSpaces();
  }

  cursorScore() {
    if (this.cursors.length === 0) {
      return { ...this.noteScore };
    }

    const score = {};
    const cursorSpaces = [];

    // Find the spaces visible cursors populate
    this.cursors.forEach((cursor) => {
      if (!cursor.visible) return;

      const { start, end } = cursor;
      cursorSpaces.push([start, end]);
      score[start] = cursor;
    });

    const noteStarts = Object.keys(this.noteScore);

    noteStarts.forEach((startKey) => {
      const note = this.noteScore[startKey];
      const { start, end } = note;

      // If note doesn't collide with cursor add to score;
      cursorSpaces.forEach((cursorSpace) => {
        const [cursorStart, cursorEnd] = cursorSpace;

        const startOverlap = start >= cursorStart && start < cursorEnd;
        const endOverlap = end > cursorStart && end < cursorEnd;

        if (!startOverlap && !endOverlap) {
          score[start] = note;
        }
      });
    });

    return score;
  }

  build() {
    const score = { ...this.cursorScore };

    const addRests = (start, targetDuration) => {
      if (targetDuration < 1) return;

      const end = start + targetDuration;
      const targetAvailable = this.isSpaceAvailable(start, end);

      if (targetAvailable) {
        score[start] = { rest: true, start, duration: targetDuration };
      } else {
        const nextTargetDuration = targetDuration / 2;

        addRests(start, nextTargetDuration);
        addRests(start + nextTargetDuration, nextTargetDuration);
      }
    };

    addRests(0, 4096);

    return score;
  }

  vex() {
    const vexEntries = [];
    const built = this.build();
    const startKeys = Object.keys(built);

    startKeys.forEach((sKey) => {
      const entry = built[sKey];
      const { duration, color } = entry;

      if (entry.rest) {
        vexEntries.push(vexNote({ isRest: true, duration }));
      } else {
        vexEntries.push(vexNote({ key: entry.vexKey, duration, color }));
      }
    });

    return vexEntries;
  }

  getAvailableSpaces() {
    const space = [];
    const noteStarts = Object.keys(this.cursorScore);
    let prevEnd = 0;

    const addSpace = (start, end) => {
      if (end - start > 0) {
        space.push([start, end]);
      }
    };

    noteStarts.forEach((startKey) => {
      const note = this.cursorScore[startKey];
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
