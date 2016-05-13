module.exports = function (app) {
  var
    path = require('path'),
    fs = require('fs'),
    co = require('co');

  // controllers, router
  function eachFiles(dir) {
    fs.readdirSync(dir).forEach(function (name) {
      if (path.extname(name) !== '') {
        require(path.join(dir, name))(app, co);
      } else if (name !== C.exceptFolder && name !== '.DS_Store') { 
        eachFiles(path.join(dir, name));
      }
    })
  }

  // no auth
  if (!~process.argv.indexOf('noauth')) {
    app.all('/admin/*', function (req, res, next) {
      if (req.session.admin || req.path === '/admin/auth' || (req.path === '/admin/blogInfo' && req.method == 'GET') ) {
        next();
      } else {
        res.json({
          status: 'fail',
          msg: 'no auth'
        });
      }
    });
  }

  // router
  eachFiles(C.dir.controller);

  // default
  app.use(function(req, res) {
    res.json({
      status: 'warnning',
      msg: 'API'
    })
  });
};