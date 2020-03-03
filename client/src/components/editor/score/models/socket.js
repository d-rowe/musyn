/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import uuid from '../utils/uuid';

const socket = new WebSocket('ws://localhost:3000');

const on = {
  cursorUpdate: () => { },
  cursorRemove: () => { },
  noteCreate: () => { },
  noteRemove: () => { },
};

const send = (message) => socket.send(message);

const sendCursorUpdate = (notename, beatIndex) => {
  send(`U:${uuid}:${beatIndex}:${notename}`);
};

const sendCursorRemove = () => {
  send(`H:${uuid}`);
};

const sendNoteCreate = (notename, beatIndex) => {
  send(`C:${uuid}:${beatIndex}:${notename}`);
};

const sendNoteDelete = (notename, beatIndex) => {
  send(`D:${uuid}:${beatIndex}:${notename}`);
};

socket.onopen = () => {
  console.log('Connected to websocket server');
};

socket.onmessage = (e) => {
  const [type, , beatIndex, notename] = e.data.split(':');
  if (type === 'U') {
    on.cursorUpdate({ beatIndex, notename });
  } else if (type === 'H') {
    on.cursorRemove();
  }
};

export default {
  send,
  on,
  sendCursorUpdate,
  sendCursorRemove,
  sendNoteCreate,
  sendNoteDelete,
};
