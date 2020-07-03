require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
require('./controller/messenger')(io);
const compositionController = require('./controller/composition');
const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use(compression());

app.use(expressStaticGzip(PUBLIC_DIR, {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}));

app.use('/compositions/:hash', compositionController.serve(PUBLIC_DIR));

app.use('/api', bodyParser.json(), apiRouter);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
