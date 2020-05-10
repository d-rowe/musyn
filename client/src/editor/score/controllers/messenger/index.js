/* eslint-disable no-console */
import io from 'socket.io-client';
// import uuid from '../utils/uuid';


// TODO: Reimpliment uuid
class Messenger {
  constructor() {
    this.listeners = {
      cursorMove: [],
      cursorHide: [],
      noteCreate: [],
      noteRemove: [],
      update: [],
    };

    this.socket = io.connect(window.location.host);

    this.socket.on('cursor', (msg) => this.cursorHandler(msg));
    this.socket.on('note', (msg) => this.noteHandler(msg));
    this.socket.on('update', () => this.invokeListener('update'));
  }

  cursorHandler(msg) {
    if (msg.action === 'move') {
      this.invokeListener('cursorMove', msg);
    } else if (msg.action === 'hide') {
      this.invokeListener('cursorHide', msg);
    }
  }

  noteHandler(msg) {
    if (msg.action === 'create') {
      this.invokeListener('noteCreate', msg);
    }
  }

  invokeListener(listenerName, message) {
    const listener = this.listeners[listenerName];
    if (listener === undefined) return;

    listener.forEach((callback) => {
      callback(message);
    });
  }

  addListener(listenerName, callback) {
    if (this.listeners[listenerName] === undefined) {
      console.warn(`Unknown socket listener: ${listenerName}`);
      return;
    }

    this.listeners[listenerName].push(callback);
  }

  onCursorMove(callback) {
    this.addListener('cursorMove', callback);
  }

  onCursorHide(callback) {
    this.addListener('cursorHide', callback);
  }

  onUpdate(callback) {
    this.addListener('update', callback);
  }

  cursorMove(pitch, measure, tick, duration) {
    this.socket.emit('cursor', {
      action: 'move', pitch, measure, tick, duration,
    });
  }

  cursorHide() {
    this.socket.emit('cursor', { action: 'hide' });
  }

  noteCreate(pitch, measure, tick, duration) {
    this.socket.emit('note', {
      action: 'create',
      pitch,
      measure,
      tick,
      duration,
    });
  }

  undo() {
    this.socket.emit('undo');
  }

  update() {
    this.socket.emit('update');
  }
}

export default new Messenger();
