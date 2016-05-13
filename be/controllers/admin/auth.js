module.exports = function (app, co) {
  app 
    .route('/admin/auth')
    .get(function (req, res) {
      co(function *() {
        var
          conditions, admin,
          query = req.query;

        if (query.action === 'in') {
          var status = 'success';
          if (req.session.admin) {
            msg = 'Admin Success';
          } else {
            conditions = {
              email: query.email,
              password: F.encrypt(query.password)
            };
            if (admin = yield M.admin.findOne(conditions)) {
              msg = 'message 2 auth js';
              req.session.admin = {
                id: admin._id,
                img: admin.img,
                name: admin.name,
                email: admin.email
              };
            } else {
              status = 'fail';
              msg = 'Failed Login Attempt';
            }
          }
          res.json({
            status: status,
            msg: msg
          })
        } else if (query.action === 'out') {
          req.session.admin = null;
          res.json({
            status: 'success',
            msg: 'Successful Logout'
          })
        } else {
          res.json({
            status: 'success',
            data: {
              admin: req.session.admin || {}
            }
          });
        }
      }).catch(F.handleErr.bind(null, res))
    })
};