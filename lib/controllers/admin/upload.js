/**
 *  Upload end points.
 */

module.exports = function (app, co) {

  var fs = require('fs'),
      path = require('path'),
      multer = require('multer'),
      storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(C.dir.resource, 'upload/article'))
        },
        filename: function (req, file, cb) {
          var name = file.originalname.match(/([\s\S]+)\.([\s\S]+)/);
          cb(null, name[1] + '-' + F.date.format('YYYY-MM-DD-HH-mm-ss') + '.' + name[2])
        }
      }),
    
    upload = multer({storage: storage});

  app.post('/admin/upload', upload.single('upfile'), function (req, res) {
      co(function *() {
        var fileName = req.file.filename;
        res.send(JSON.stringify({ 
          url: C.resourceFixUrl + '/upload/' + fileName,
          title: fileName,
          state: "SUCCESS"
        }));
      })
    })
};


