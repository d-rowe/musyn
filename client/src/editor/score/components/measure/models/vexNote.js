import { Flow } from 'vexflow';
import { pitchesToVexKeys } from '../../../utils/notes';

const vexNote = ({
  isRest = false,
  beatDuration = 1,
  pitches = ['B4'],
  clef = 'treble',
  color,
  colorKeyIndex = 0,
}) => {
  const beatDurations = {
    0.25: '16',
    0.5: '8',
    1: '4',
    2: '2',
    4: '1',
  };

  const beatDurationStr = beatDurations[beatDuration];
  const duration = `${beatDurationStr}${isRest ? 'r' : 'n'}`;

  const keys = pitchesToVexKeys(pitches);

  const note = new Flow.StaveNote({
    clef,
    keys,
    duration,
    auto_stem: true,
  });

  const xShifts = {
    '1r': 75,
    '2r': 25,
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
