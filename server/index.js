require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();
const server = require('http').Server(app);
const { serveStatic, composition, messenger } = require('./controller');
const { authCheck } = require('./controller/auth');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

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
app.use(authCheck, serveStatic(PUBLIC_DIR));
app.use('/welcome', serveStatic(PUBLIC_DIR));
app.use('/api', bodyParser.json(), apiRoutes);
app.use('/auth', authRoutes);
app.use('/profile', authCheck, (req, res) => res.send(`Welcome ${req.user.display_name}`));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT);
});
