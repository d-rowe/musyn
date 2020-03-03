/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
// TODO: Split into controller and model
import uuid from '../utils/uuid';

const socket = new WebSocket('ws://localhost:3000');

const on = {
  cursorUpdate: () => { },
  cursorRemove: () => { },
  noteCreate: () => { },
  noteRemove: () => { },
  update: () => { },
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

const sendUndo = () => {
  send('undo:_:_:_');
};

socket.onopen = () => {
  console.log('Connected to websocket server');
  send(`register:${uuid}:_:_`);
};

socket.onmessage = (e) => {
  const msg = e.data;

  if (msg === 'update') {
    on.update();
  }

  const [type, , beatIndex, notename] = msg.split(':');
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
  sendUndo,
};
