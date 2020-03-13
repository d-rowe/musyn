import socket from './socket';

class Cursors {
  constructor() {
    this.cursors = {};

    this.colors = [
      [51, 101, 138], // Blue
      [242, 100, 25], // Orange
    ];
    this.colorsUsed = 0;

    this.add('local');
    this.add('remote');
  }

  update(userId, tick, pitch) {
    const cursor = this.cursors[userId];
    cursor.tick = tick;
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
