import socket from './socket';
import score from './score';

class Cursors {
  constructor() {
    this.cursors = {};

    this.colors = [
      [51, 101, 138], // Blue
      [242, 100, 25], // Orange
    ];
    this.colorsUsed = 0;
    this.defaultDuration = 1024;

    this.add('local');
    this.add('remote');
  }

  commit() {
    const { local } = this.cursors;
    const {
      measure,
      tick,
      pitch,
      duration,
    } = local;

    score.add(measure, tick, pitch, duration);
    this.hide('local');
  }

  update(userId, pitch, measure, tick, duration = this.defaultDuration) {
    const cursor = this.cursors[userId];
    const tickQuantize = Math.floor(tick / duration) * 1024;

    cursor.measure = measure;
    cursor.tick = tickQuantize;
    cursor.pitch = pitch;
    cursor.display = true;

    if (duration !== undefined) {
      cursor.duration = duration;
    }

    socket.sendCursorUpdate(pitch, tickQuantize);
  }

  hide(userId) {
    this.cursors[userId].display = false;
    socket.sendCursorRemove();
  }

  add(userId) {
    const color = this.nextColor();
    const duration = this.defaultDuration;

    this.cursors[userId] = {
      pitch: '',
      tick: -1,
      measure: -1,
      duration,
      display: false,
      color,
    };
  }

  nextColor() {
    const color = this.colors[this.colorsUsed];
    this.colorsUsed += 1;
    return `rgba(${color.join(', ')}, 0.8)`;
  }
}

export default new Cursors();
