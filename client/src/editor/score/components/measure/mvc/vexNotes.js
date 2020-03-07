import { Flow } from 'vexflow';

const vexNote = ({
  isRest = false,
  beatDuration = 1,
  keys = ['b/4'],
  clef = 'treble',
  color,
  colorKeyIndex = 0,
}) => {
  const beatDurations = {
    1: 'q',
    2: 'h',
    4: 'w',
  };

  const beatDurationStr = beatDurations[beatDuration];
  const duration = `${beatDurationStr}${isRest ? 'r' : 'n'}`;

  const note = new Flow.StaveNote({
    clef,
    keys,
    duration,
  });

  const xShifts = {
    wr: 75,
    hr: 25,
  };

  const xShift = xShifts[duration];

  if (xShift !== undefined) {
    note.setXShift(xShift);
  }


  if (color !== undefined) {
    note.setKeyStyle(colorKeyIndex, { fillStyle: color });
  }

  if (keys.length === 1) {
    note.setStemStyle({ strokeStyle: color });
  }

  return note;
};

export default vexNote;
