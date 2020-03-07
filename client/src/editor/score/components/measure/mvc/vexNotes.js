import { Flow } from 'vexflow';

const restKeys = ['b/4'];
const restClef = 'treble';

export const wholeRest = new Flow.StaveNote({
  clef: restClef,
  keys: restKeys,
  duration: 'wr',
}).setXShift(75);

export const halfRest = new Flow.StaveNote({
  clef: restClef,
  keys: restKeys,
  duration: 'hr',
});
