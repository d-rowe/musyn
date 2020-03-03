/* eslint-disable import/prefer-default-export */
export const noteMap = {
  29: 'G3',
  28: 'A3',
  27: 'B3',
  26: 'C4',
  25: 'D4',
  24: 'E4',
  23: 'F4',
  22: 'G4',
  21: 'A4',
  20: 'B4',
  19: 'C5',
  18: 'D5',
  17: 'E5',
  16: 'F5',
  15: 'G5',
  14: 'A5',
  13: 'B5',
  12: 'C6',
};

const letters = 'CDEFGAB';
const noteRegEx = /([a-gA-G])([b|#|x]*)?([0-9])?/;

const pitchPos = (letter, octave) => {
  const letterY = letters.indexOf(letter);
  const octaveY = octave * 7;
  return letterY + octaveY;
};

const parseNotename = (notename) => {
  let [, letter, accidental, octave] = (noteRegEx.exec(notename));

  letter = letter.toUpperCase();
  accidental = accidental || '';
  octave = octave || 4;
  const lowerLetter = letter.toLowerCase();

  return {
    notename: `${letter}${accidental}${octave}`,
    letter,
    accidental,
    octave,
    vexKey: `${lowerLetter}${accidental}/${octave}`,
    pos: pitchPos(letter, octave),
  };
};

const parseNotes = (noteArray) => (
  noteArray.map((notename) => parseNotename(notename))
);

export const parseAndSortNotes = (noteArray) => {
  if (noteArray.length === 0) return [];

  const parsedNoteArray = parseNotes(noteArray);
  return parsedNoteArray.sort((a, b) => a.pos - b.pos);
};
