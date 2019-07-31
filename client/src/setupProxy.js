const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy(['/api/podcasts', '/api/auth', '/api/users'], {
      target: 'http://localhost:5000'
    })
  );
};
