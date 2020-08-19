const pitchMap = require('./pitchMap');

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
    tone1 = 'Keys_Piano',
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
    this.setTone1(tone1);
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

  setTone1(tone) {
    this.tone1 = tone;
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

module.exports = Note;
