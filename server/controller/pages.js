module.exports = (next) => (page) => (req, res) => (
  next.render(req, res, page, req.query)
);
