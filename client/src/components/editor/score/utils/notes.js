/* eslint-disable import/prefer-default-export */
export const noteMap = {
  35: 'G3',
  34: 'A3',
  33: 'B3',
  32: 'C4',
  31: 'D4',
  30: 'E4',
  29: 'F4',
  28: 'G4',
  27: 'A4',
  26: 'B4',
  25: 'C5',
  24: 'D5',
  23: 'E5',
  22: 'F5',
  21: 'G5',
  20: 'A5',
  19: 'B5',
  18: 'C6',
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
