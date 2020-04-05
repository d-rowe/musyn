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
      console.log(message);
    };

    setInterval(() => this.send('ping'), 10000);
  }

  addListener(eventName, callback) {
    if (this.listeners[eventName] === undefined) {
      console.warn(`Unknown socket event: ${eventName}`);
      return;
    }

    this.listeners[eventName].push(callback);
  }

  onCursorMove(callback) {
    this.addListener('cursorMove', callback);
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

  noteCreate(pitch, measure, tick) {
    this.send('note', 'create', { pitch, measure, tick });
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
