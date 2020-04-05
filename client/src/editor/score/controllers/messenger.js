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
      const { type, action, payload } = JSON.parse(data);
      console.log(type, action, payload);
    };

    setInterval(() => this.sendMessage('PING'), 10000);
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

  sendMessage(type, action, payload) {
    const message = { uuid, type };

    if (action) {
      message.action = action;
    }

    if (payload) {
      message.payload = payload;
    }

    this.socket.send(JSON.stringify(message));
  }

  cursorMove(pitch, measure, tick) {
    this.sendMessage('cursor', 'move', { pitch, measure, tick });
  }

  cursorHide() {
    this.sendMessage('cursor', 'hide');
  }

  noteCreate(pitch, measure, tick) {
    this.sendMessage('note', 'create', { pitch, measure, tick });
  }

  noteDelete(pitch, measure, tick) {
    this.sendMessage('note', 'delete', { pitch, measure, tick });
  }

  update() {
    this.sendMessage('update');
  }

  register() {
    this.sendMessage('register');
  }
}

export default new Messenger();
