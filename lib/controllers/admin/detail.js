/**
 *  Admin details end points.
 */

module.exports = function (app, co) {

  app.route('/admin/detail')

    // get
    .get(function (req, res) {
      co(function *() {
        var id = req.query.id,
            x = req.query.x,
            xData = id ? yield M[x].findOne({_id: id}) : {};

        // 模板渲染
        res.json({
          status: 'success',
          data: {
            xData: xData,
            useEditor: x === 'singlePage' ? true : false
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // delete
    .delete(function (req, res) {
      co(function *() {
        res.json((yield M[req.query.x].remove({_id: req.query.id})) ?
        {
          status: 'success',
          msg: 'Comment Removed'
        } : {
          status: 'fail',
          msg: 'Comment Removal Failed'
        });

      }).catch(F.handleErr.bind(null, res))
    })

    // put
    .put(function (req, res) {
      co(function *() {
        var x = req.query.x,
            body = req.body;

        if (x === 'admin') body.password = F.encrypt(body.password);

        res.json((yield M[x].findOneAndUpdate({_id: req.query.id}, body)) ?
        {
          status: 'success',
          msg: 'details updated'
        } : {
          status: 'fail',
          msg: 'detail update failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // post
    .post(function (req, res) {
      co(function *() {
        var x = req.query.x,
            body = req.body;

        if (x === 'admin') {
          body.password = F.encrypt(body.password);
          body.img = '/upload/img/mo.jpg';
        }

        res.json((yield M[x].create(body)) ?
        {
          status: 'success',
          msg: 'details created'
        } : {
          status: 'fail',
          msg: 'detail creation failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
