/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').Server(app);
const path = require('path');
const Messenger = require('./controllers/messenger');
const apiRouter = require('./controllers/api');

const messenger = new Messenger(server);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use(express.static(PUBLIC_DIR));

app.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log('Server listening on port', 3000);
});
