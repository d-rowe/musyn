require('dotenv').config();
const http = require('http');
const express = require('express');
const next = require('next');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { serveStatic, composition, messenger } = require('./controller');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const pageController = require('./controller/pages')(nextApp);

nextApp.prepare().then(() => {
  const app = express();
  const handle = nextApp.getRequestHandler();
  const server = http.Server(app);

  // Initialize socket.io messenger server
  messenger(server);

  // Middleware
  app.use(compression());
  app.use(cookieSession({
    maxAge: 86400000,
    keys: [process.env.COOKIE_KEY],
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/compositions/:hash', composition.serve(PUBLIC_DIR));
  app.get('/', pageController('/home'));
  app.use(serveStatic(PUBLIC_DIR));
  app.use('/api', bodyParser.json(), apiRoutes);
  app.use('/auth', authRoutes);

  app.all('*', (req, res) => handle(req, res));

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on port', PORT);
  });
});
