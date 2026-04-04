module.exports = function requireAdmin(req, res, next) {
  const password = req.body.admin_password;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(403).render('error', {
      message: 'Incorrect admin password. Go back and try again.'
    });
  }
  next();
};