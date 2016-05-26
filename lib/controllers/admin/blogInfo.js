/**
 *  Blog Info end points.
 */

module.exports = function (app, co) {

  app.route('/admin/blogInfo')

    // get
    .get(function (req, res) {
      co(function *() {
        res.json({
          status: 'success',
          data: {
            loggedin: req.session.admin ? true : false,
            blogInfo: (yield M.blogInfo.findOne()) || {}
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // put
    .put(function (req, res) {
      co(function *() {
        res.json((yield M.blogInfo.findOneAndUpdate(req.body)) ?
        {
          status: 'success',
          msg: 'blog info updated'
        } : {
          status: 'fail',
          msg: 'blog info update failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // post
    .post(function (req, res) {
      co(function *() {
        res.json((yield M.blogInfo.create(req.body)) ?
        {
          status: 'success',
          msg: 'blog info created'
        } : {
          status: 'fail',
          msg: 'blog info creation failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
