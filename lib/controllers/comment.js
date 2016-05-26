/**
 *  Comments List end point
 */

module.exports = function (app, co) {
  app.route('/comment')
    
    // post
    .post(function (req, res) {
      co(function *() {
        var body = req.body,
            session = req.session,
            user, admin, comment, status, msg, data;

        if (admin = session.admin) { 
          body.admin = admin.id
        } else if ((user = session.user) && user.email === body.email) { 
          body.user = user.id
        } else { 
          user = (yield M.user.findOne({
              email: body.email
            })) || (yield M.user.create({
              img: '/upload/img/user.jpg',
              name: body.name,
              email: body.email
            }))
          body.user = user._id
          req.session.user = {
            id: user._id,
            img: user.img,
            name: user.name,
            email: user.email
          };
        }

        body.time = F.date.format('YYYY-MM-DD HH:mm:ss');

        if (comment = yield M.comment.create(body)) {
          data = {
            content: comment.content,
            time: comment.time
          };
          if (user) {
            data.user = {
              img: user.img,
              name: user.name
            };
          } else {
            data.admin = {
              img: admin.img,
              name: admin.name
            };
          }
          status = 'success';
          msg = 'comment created';
        } else {
          status = 'fail';
          msg = 'comment creation failed'
        }
        res.json({
          status: status,
          msg: msg,
          data: data
        })
      }).catch(F.handleErr.bind(null, res))
    })
};
