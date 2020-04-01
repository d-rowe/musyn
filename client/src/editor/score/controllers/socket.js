/* eslint-disable no-console */
import uuid from '../utils/uuid';


class Socket {
  constructor() {
    this.listeners = {
      cursorUpdate: [],
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

    this.socket.onmessage = ({ dataStr }) => {
      const { type, action, payload } = JSON.parse(dataStr);
      this.handleEvent(type, action, payload);
    };

    setInterval(() => this.sendMessage('PING'), 10000);
  }

  handleEvent(type, action, payload) {
    const handlers = this.listeners[type];

    if (handlers !== undefined) {
      handlers.forEach((callback) => {
        callback(...payload);
      });
    }
  }

  on(event, callback) {
    if (this.listeners[event] === undefined) {
      console.warn(`Unknown socket event: ${event}`);
      return;
    }

    this.listeners[event].push(callback);
  }

  sendMessage(type, action, payload) {
    const message = { type, uuid };

    if (action) {
      message.action = action;
    }

    if (payload) {
      message.payload = payload;
    }

    this.socket.send(JSON.stringify(message));
  }

  cursorUpdate(pitch, measure, tick) {
    this.sendMessage('cursor', 'update', { pitch, measure, tick });
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

  register() {
    this.sendMessage('register');
  }
}

export default new Socket();
