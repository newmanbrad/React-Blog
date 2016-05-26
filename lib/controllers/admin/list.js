/**
 *  Admin List end points.
 */

module.exports = function (app, co) {

  app.route('/admin/list')

    // get
    .get(function (req, res) {
      co(function *() {
        var xData, options,
           conditions = req.query,
           x = conditions.x,
           pageList = {
              current: +conditions.page || 1,
              numRange: 4,
              size: 10
            };

        delete conditions.page;
        delete conditions.x;

        options = {
          limit: pageList.size,
          sort: {_id: -1},
          skip: (pageList.current - 1) * pageList.size
        };

        if (x === 'comment') {
          xData = yield M[x].find(conditions, null, options).populate('admin user');
        } else {
          xData = yield M[x].find(conditions, null, options);
        }

        pageList.rowCount = yield M[x].count(conditions);
        pageList.pageCount = Math.ceil(pageList.rowCount / pageList.size);

        if (x === 'user') {
          for (var user of xData) {
            user._doc.commentCount = yield M.comment.count({user: user._id});
          }
        }

        res.json({
          status: 'success',
          data: {
            xData: xData,
            pageList: pageList
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
