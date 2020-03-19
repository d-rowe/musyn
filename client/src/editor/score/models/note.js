export const pitchMap = {
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

class Note {
  constructor({
    pitch = 'C4',
    y,
    start = 0,
    duration = 1024,
    measure,
    visible = true,
    color,
    author,
  }) {
    if (y !== undefined && pitchMap[y] !== undefined) {
      this.setPitch(pitchMap[y]);
    } else {
      this.setPitch(pitch);
    }

    this.setVisible(visible);
    this.setStart(start);
    this.setDuration(duration);
    this.setMeasure(measure);
    this.setColor(color);
    this.setAuthor(author);
  }

  setPitch(pitch) {
    this.pitch = pitch;
    this.parsePitch();
  }

  setStart(start) {
    this.start = start;
    this.calcEnd();
  }

  setDuration(duration) {
    this.duration = duration;
    this.calcEnd();
  }

  calcEnd() {
    const end = this.start + this.duration;

    if (end > 4096) {
      this.setVisible(false);
    } else {
      this.end = end;
    }
  }

  setMeasure(measure) {
    this.measure = measure;
  }

  setColor(color) {
    this.color = color;
  }

  setAuthor(author) {
    this.author = author;
  }

  setVisible(bool) {
    this.visible = bool;
  }

  parsePitch() {
    const pitchExp = /([a-gA-G])([b|#|x]*)?([0-9])?/;
    const [, letter, accidental, octave] = (pitchExp).exec(this.pitch);

    this.letter = letter.toUpperCase();
    this.accidental = accidental || '';
    this.octave = octave || 4;
    const lowerLetter = letter.toLowerCase();

    this.pitch = `${this.letter}${this.accidental}${this.octave}`;
    this.vexKey = `${lowerLetter}${this.accidental}/${this.octave}`;
  }
}

export default Note;
