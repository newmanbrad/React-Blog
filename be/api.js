var
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieSession = require('cookie-session'),
  app = express();

/**
 * C - Config
 * M - Model
 * F - Functions
 */

global.C = require('./config');
global.M = {};
global.F = require(path.join(C.dir.controller, C.exceptFolder, 'funcs'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieSession(C.cookieSession));

require(path.join(C.dir.model, C.exceptFolder)); // model
require(path.join(C.dir.controller, C.exceptFolder))(app); // router

//console.log('Express is listening on port:', C.port);
app.listen(C.port);