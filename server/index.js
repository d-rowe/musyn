require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const { serveStatic, composition, messenger } = require('./controller');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

// Initialize socket.io messenger server
messenger(server);

// Middleware
app.use(compression());
app.get('/compositions/:hash', composition.serve(PUBLIC_DIR));
app.use(serveStatic(PUBLIC_DIR));
app.use('/api', bodyParser.json(), apiRoutes);
app.use('/auth', authRoutes);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
