/* eslint-disable no-console */
import uuid from '../utils/uuid';


class Messenger {
  constructor() {
    this.listeners = {
      cursorMove: [],
      cursorHide: [],
      noteCreate: [],
      noteRemove: [],
      update: [],
    };

    this.socket = new WebSocket(`ws://${window.location.host}`);

    this.socket.onopen = () => {
      console.log('Connected to websocket server');
      this.register();
    };

    this.socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      this.messageHandler(message);
    };

    setInterval(() => this.send('ping'), 10000);
  }

  messageHandler(message) {
    const { type, action } = message;

    if (type === 'cursor') {
      if (action === 'move') {
        this.invokeListenener('cursorMove', message);
        return;
      }

      if (action === 'hide') {
        this.invokeListenener('cursorHide', message);
        return;
      }
    }

    if (type === 'note') {
      if (action === 'create') {
        this.invokeListenener('noteCreate', message);
        return;
      }

      if (action === 'delete') {
        this.invokeListenener('noteDelete', message);
        return;
      }
    }

    if (type === 'update') {
      this.invokeListenener('update', message);
    }
  }

  invokeListenener(listenerName, message) {
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

  send(type, action, payload) {
    const message = { uuid, type };

    if (action) {
      message.action = action;
    }

    if (payload) {
      message.payload = payload;
    }

    this.socket.send(JSON.stringify(message));
  }

  cursorMove(pitch, measure, tick, duration) {
    this.send('cursor', 'move', {
      pitch, measure, tick, duration,
    });
  }

  cursorHide() {
    this.send('cursor', 'hide');
  }

  noteCreate(pitch, measure, tick, duration) {
    this.send('note', 'create', {
      pitch,
      measure,
      tick,
      duration,
    });
  }

  noteDelete(pitch, measure, tick) {
    this.send('note', 'delete', { pitch, measure, tick });
  }

  update() {
    this.send('update');
  }

  register() {
    this.send('register');
  }
}

export default new Messenger();
