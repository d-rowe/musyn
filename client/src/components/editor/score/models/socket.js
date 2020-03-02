/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
const socket = new WebSocket('ws://localhost:3000');

const on = {
  cursorUpdate: () => { },
};

const send = (message) => socket.send(message);

socket.onopen = () => {
  console.log('Connected to websocket server');
};

socket.onmessage = (e) => {
  const [type,, beatIndex, notename] = e.data.split(':');
  if (type === 'C') {
    on.cursorUpdate({ beatIndex, notename });
  }
};

export default { send, on };
