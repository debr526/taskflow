const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

const checkNotAuth = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect('/tasks/dashboard');
  }
  next();
};

module.exports = { checkAuth, checkNotAuth };
