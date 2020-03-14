import socket from './socket';
import score from './score';

class Cursors {
  constructor() {
    this.cursors = {};

    this.beatDuration = 1;

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
    score.addNote(local.pitch, local.tick);

    this.hide('local');
  }

  update(userId, tick, pitch) {
    const cursor = this.cursors[userId];

    const quantizedTick = Math.floor(tick / (this.beatDuration * 1024)) * 1024;

    cursor.tick = quantizedTick;
    cursor.pitch = pitch;

    socket.sendCursorUpdate(pitch, tick);
  }

  hide(userId) {
    this.update(userId, -1, '');
    socket.sendCursorRemove();
  }

  add(userId) {
    const color = this.nextColor();

    this.cursors[userId] = {
      pitch: '',
      tick: -1,
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
