module.exports = (req, res, next) => {
  if (/\W+/.test(req.params.id)) {
    res
      .status(400)
      .send({
        error: `the id param you entered, ${
          req.params.id
        }, is not formatted correctly; it should only contain alphanumeric chars`
      });
  } else {
    next();
  }
};
