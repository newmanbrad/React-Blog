/***
 * dev/local config goes here
 ***/

var path = require('path'),
    beRoot = path.resolve(__dirname, '..'),
    envConfig = require('../../env.config').dev.apiServer,
    config = {
      cookieSession: { // session
        name: 'blog',
        keys: ["blog-cookie-key"]
      },
      db: {
        uri: 'mongodb://localhost:27017/blog',
        opts: {
          user: '',
          pass: ''
        }
      },
      port: envConfig.port, 
      dir: { 
        root: beRoot,
        model: path.resolve(beRoot, 'models'),
        controller: path.resolve(beRoot, 'controllers'),
        resource: path.resolve(beRoot, '../resource')
      },
      resourceFixUrl: '', 
      exceptFolder: 'except' 
    };

module.exports = config;




