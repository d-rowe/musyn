require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const { static, composition, messenger } = require('./controller');
const api = require('./routes/api');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

// Initialize socket.io messenger server
messenger(server);

// Middleware
app.use(compression());
app.use(static(PUBLIC_DIR));
app.use('/compositions/:hash', composition.serve(PUBLIC_DIR));
app.use('/api', bodyParser.json(), api);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
