import io from 'socket.io-client';
import uuid from '../../utils/uuid';
import getHash from '../../../../../helpers/getHash';


class Messenger {
  constructor() {
    this.listeners = {
      cursorMove: [],
      cursorHide: [],
      noteCreate: [],
      noteRemove: [],
      update: [],
    };
    this.hash = getHash();

    this.socket = io.connect(window.location.host, {
      query: { composition: this.hash },
    });

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
      // eslint-disable-next-line no-console
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
    this.send('cursor', {
      action: 'move', pitch, measure, tick, duration,
    });
  }

  cursorHide() {
    this.send('cursor', { action: 'hide' });
  }

  noteCreate(pitch, measure, tick, duration) {
    this.send('note', {
      action: 'create',
      pitch,
      measure,
      tick,
      duration,
    });
  }

  undo() {
    this.send('undo');
  }

  update() {
    this.send('update');
  }

  send(type, msg) {
    this.socket.emit(
      type,
      { ...msg, uuid, composition: this.hash },
    );
  }
}

export default new Messenger();
