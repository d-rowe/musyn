module.exports = (req, res, next) => {
  if (req.user !== undefined) {
    next();
  } else {
    res.redirect('/');
  }
};
