require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
require('./controllers/messenger')(server);
const apiRouter = require('./controllers/api');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use(express.static(PUBLIC_DIR));

app.use('/api', apiRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
