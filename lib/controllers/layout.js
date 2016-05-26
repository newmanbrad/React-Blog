/**
 *  Layout end points
 */

module.exports = function (app, co) {
  app.route('/layout')
    
    // get
    .get(function (req, res) {
      co(function *() {
        var blogInfo, articleTypes, articleTags, links;

        articleTypes = yield M.articleType.find({enabled: true});

        blogInfo = (yield M.blogInfo.findOne()) || {};

        articleTags = articleTags || (yield M.articleTag.find());

        links = yield M.link.find();

        res.json({
          status: 'success',
          data: {
            articleTypes: articleTypes,
            blogInfo: blogInfo,
            links: links,
            articleTags: articleTags
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
