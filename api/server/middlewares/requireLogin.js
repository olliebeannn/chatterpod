module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      error: 'Login required to access this page or perform this action'
    });
  }
  next();
};
