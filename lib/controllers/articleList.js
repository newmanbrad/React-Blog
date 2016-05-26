/**
 *  Article List end point
 */

module.exports = function (app, co) {
  app.route('/articleList')
    .get(function (req, res) {
      co(function *() {
        var articleTypes, articles, typeOrTagName, pageList, options, articleTags, rKeyword, typeId, tagId,
            query = req.query,
            typePath = query.typePath,
            tagPath = query.tagPath,
            keyword = query.keyword,
            typePaths = [],
            tagPaths = [],
            conditions = {},
            pageList = {
              current: +query.page || 1,
              numRange: 4,
              size: 10
            };

        if (tagPath) {

          articleTags = yield M.articleTag.find();

          articleTags.forEach(function (v) {
            tagPaths.push(v.path);
            if (v.path === tagPath) {
              typeOrTagName = v.name + '_Tag';
              tagId = v._id;
            }
          });

          if (!~tagPaths.indexOf(tagPath)) return res.json({status: 'warning', msg: '0 records returned'});
          conditions['tags'] = {$all: tagId};
          pageList.query = {tagPath: tagPath};

        } else if (keyword != null) {
          rKeyword = new RegExp(keyword, 'i');
          conditions['$or'] = [{'title': rKeyword}, {'introduction': rKeyword}, {'content': rKeyword}, {'type.name': rKeyword}, {'tags.name': rKeyword}];
          pageList.query = {keyword: keyword};

        } else if (typePath) {

          articleTypes = yield M.articleType.find({enabled: true});

          articleTypes.forEach(function (v) {
            typePaths.push(v.path);
            if (v.path === typePath) {
              typeOrTagName = v.name;
              typeId = v._id;
            }
          });

          if (!~typePaths.indexOf(typePath)) return res.json({status: 'warning', msg: '0 records returned'});

          conditions['type'] = typeId;
          pageList.query = {typePath: typePath};
        }

        conditions.enabled = true;
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
            typeOrTagName: typeOrTagName,
            articles: articles,
            pageList: pageList,
          }
        });
      }).catch(F.handleErr.bind(null, res))
    })
};
