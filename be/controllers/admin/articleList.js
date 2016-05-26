/**
 *  Article List end points.
 */
module.exports = function (app, co) {
  app
    .route('/admin/articleList')
    .get(function (req, res) {
      co(function *() {
        var articleTypes, articles, pageList, options,
            conditions = req.query,
            pageList = {
              current: +conditions.page || 1,
              numRange: 4,
              size: 10
            };

        delete conditions.page;

        options = {
          limit: pageList.size,
          sort: {_id: -1},
          skip: (pageList.current - 1) * pageList.size
        };

        articles = yield M.article.find(conditions, null, options).populate('type tags');
        pageList.rowCount = yield M.article.count(conditions);
        pageList.pageCount = Math.ceil(pageList.rowCount / pageList.size);

        for (var article of articles) {
          article._doc.commentCount = yield M.comment.count({'article.id': article._id});
        }

        res.json({
          status: 'success',
          data: {
            articles: articles,
            pageList: pageList
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })
};