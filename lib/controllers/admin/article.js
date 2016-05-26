/**
 *  Article end points.
 */

module.exports = function (app, co) {

  app.route('/admin/article')

    // get
    .get(function (req, res) {
      co(function *() {
        var id = req.query.id,
          articleTypes = yield M.articleType.find({enabled: true}),
          article = id ? yield M.article.findOne({_id: id}) : {},
          articleTags = yield M.articleTag.find();

        res.json({
          status: 'success',
          data: {
            articleTypes: articleTypes,
            article: article,
            articleTags: articleTags
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // delete
    .delete(function (req, res) {
      co(function *() {

        res.json((yield M.article.remove({_id: req.query.id})) ?
        {
          status: 'success',
          msg: 'article deleted'
        } : {
          status: 'fail',
          msg: 'article removal failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // put
    .put(function (req, res) {
      co(function *() {
        var body = req.body;
        body.lastEditTime = F.date.format('YYYY-MM-DD HH:mm:ss');

        res.json((yield M.article.findOneAndUpdate({_id: req.query.id}, body)) ?
        {
          status: 'success',
          msg: 'article updated'
        } : {
          status: 'fail',
          msg: 'article update failed'
        });
      }).catch(F.handleErr.bind(null, res))
    })

    // post
    .post(function (req, res) {
      co(function *() {
        var body = req.body;
        body.createTime = body.lastEditTime = F.date.format('YYYY-MM-DD HH:mm:ss');

        res.json((yield M.article.create(body)) ?
        {
          status: 'success',
          msg: 'article created'
        } : {
          status: 'fail',
          msg: 'article creation failed'
        });

      }).catch(F.handleErr.bind(null, res))
    })
};
