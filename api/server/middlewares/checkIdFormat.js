module.exports = (req, res, next) => {
  if (/\W+/.test(req.params.id)) {
    util.setError(
      400,
      `id param is not formatted correctly; it should only contain alphanumeric chars`
    );
    return util.send(res);
  } else {
    next();
  }
};
