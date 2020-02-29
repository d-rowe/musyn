const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'public');

app.use('/', express.static(PUBLIC_DIR));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', 3000);
});
