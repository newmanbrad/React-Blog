var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(C.db.uri, C.db.opts); 

fs.readdirSync(C.dir.model).forEach(function (name) { 
  if (path.extname(name) !== '') {
    name = path.basename(name, '.js');
    M[name] = mongoose.model(name, new Schema(require(path.join(C.dir.model, name))(Schema)));
  }
})
