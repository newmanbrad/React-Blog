/**
 *  Article end point
 */

module.exports = function (app, co) {
  app.route('/article')
     
    // get
    .get(function (req, res) {
      co(function *() {
        var article, comments;
        
        article = yield M.article.findOneAndUpdate({
          _id: req.query.id,
          enabled: true
        }, {$inc: {visits: 1}}).populate('type tags');

        if (!article) return res.json({status: 'warning', msg: 'no records found'});

        comments = yield M.comment.find({'article.id': article._id}).sort({_id: -1}).populate('user admin');
        
        res.json({
          status: 'success',
          data: {
            article: article,
            comments: comments,
            commenter: req.session.admin || req.session.user || {}
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
