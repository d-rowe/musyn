const expressStaticGzip = require('express-static-gzip');

module.exports = (PUBLIC_DIR) => (req, res, next) => {
  expressStaticGzip(PUBLIC_DIR, {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    }
  })(req, res, next);
};
