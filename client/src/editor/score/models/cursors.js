import socket from './socket';
import score from './score';
import Note from './note';

class Cursors {
  constructor() {
    this.cursors = {};
    this.measureViews = {};

    this.colors = [
      [51, 101, 138], // Blue
      [242, 100, 25], // Orange
    ];
    this.colorsUsed = 0;

    this.add('local');
    this.add('remote');
  }

  commit() {
    const { local } = this.cursors;
    const {
      measure,
      start,
      pitch,
      duration,
    } = local;

    score.add(measure, start, pitch, duration);
    this.hide('local');
  }

  update(author, pitch, measure, start, duration) {
    const note = this.cursors[author];
    const currDuration = duration === undefined ? note.duration : duration;
    const startQuantized = Math.floor(start / currDuration) * currDuration;

    note.setMeasure(measure);
    note.setStart(startQuantized);
    note.setPitch(pitch);
    note.setVisible(true);

    if (duration !== undefined) {
      note.setDuration(duration);
    }

    this.rerenderMeasure(measure);

    socket.sendCursorUpdate(pitch, startQuantized);
  }

  hide(author) {
    const note = this.cursors[author];
    note.setVisible(false);
    this.rerenderMeasure(note.measure);
    socket.sendCursorRemove();
  }

  add(author) {
    this.cursors[author] = new Note({
      color: this.nextColor(),
      visible: false,
    });
  }

  nextColor() {
    const color = this.colors[this.colorsUsed];
    this.colorsUsed += 1;
    return `rgba(${color.join(', ')}, 0.8)`;
  }

  rerenderMeasure(measure) {
    this.measureViews[measure].rerender();
  }

  registerMeasureView(measure, view) {
    this.measureViews[measure] = view;
  }

  getMeasure(measure) {
    const authors = Object.keys(this.cursors);
    const cursorsAtMeasure = [];

    authors.forEach((author) => {
      const note = this.cursors[author];

      if (note.measure === measure && note.visible) {
        cursorsAtMeasure.push(note);
      }
    });

    return cursorsAtMeasure;
  }
}

export default new Cursors();
