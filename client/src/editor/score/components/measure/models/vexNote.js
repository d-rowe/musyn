import { Flow } from 'vexflow';

const vexNote = ({
  isRest = false,
  duration = 1024,
  key = 'b/4',
  clef = 'treble',
  color,
  colorKeyIndex = 0,
}) => {
  const vexDuration = `${4096 / duration}${isRest ? 'r' : 'n'}`;

  const note = new Flow.StaveNote({
    clef,
    keys: [key],
    duration: vexDuration,
    auto_stem: true,
  });

  const xShifts = {
    '1r': 75,
    '2r': 25,
  };

  const xShift = xShifts[vexDuration];

  if (xShift !== undefined) {
    note.setXShift(xShift);
  }

  if (color !== undefined) {
    note.setKeyStyle(colorKeyIndex, { fillStyle: color });
    note.setStemStyle({ strokeStyle: color });
  }

  return note;
};

export default vexNote;
