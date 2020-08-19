import messenger from '../controller/messenger';
import score from './score';
import Note from '../../../../../../lib/note';

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

    messenger.onCursorMove((message) => {
      const {
        tone1,
        pitch,
        measure,
        tick,
        duration,
      } = message;
      this.update('remote', pitch, measure, tick, duration, tone1);
    });

    messenger.onCursorHide(() => {
      this.hide('remote');
    });
  }

  commit() {
    const { local } = this.cursors;
    const note = { ...local };
    note.color = undefined;
    this.hide('local');
    score.add(note);
  }

  update(author, pitch, measure, start, duration, tone) {
    const note = this.cursors[author];
    const currDuration = duration === undefined ? note.duration : duration;
    const tone1 = tone === undefined ? note.tone1 : 'Keys_Piano';
    const startQuantized = Math.floor(start / currDuration) * currDuration;

    if (startQuantized >= 4096) {
      this.hide('local');
      return;
    }

    if (note.measure === measure && note.start === startQuantized && note.pitch === pitch) {
      return;
    }

    note.setMeasure(measure);
    note.setStart(startQuantized);
    note.setPitch(pitch);
    note.setAuthor(author);
    note.setVisible(true);
    note.setTone1(tone1);

    if (duration !== undefined) {
      note.setDuration(duration);
    }

    this.rerenderMeasure(measure);

    if (author === 'local') {
      messenger.cursorMove(pitch, measure, startQuantized, note.duration, note.tone1);
    }
  }

  hide(author) {
    const note = this.cursors[author];

    if (!note.visible) return;

    note.setVisible(false);
    this.rerenderMeasure(note.measure);

    if (author === 'local') {
      messenger.cursorHide();
    }
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

  setDuration(duration) {
    this.cursors.local.duration = duration;
  }

  setTone1(tone) {
    this.cursors.local.tone1 = tone;
    console.log(this.cursors.local.tone1);
  }

  rerenderMeasure(measure) {
    if (measure === undefined) return;

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
