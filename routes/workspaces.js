var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

//Spa render, renderuje samo content unutar workspaceova, dok /workspaces getuje ceo layout koji pomocu rutiranja poziva /sparender

router.get('/',middleware.ensureAuthenticated,function(req, res, next) {
  res.render('main/layout');
});
// ruta /sparender je za single page ajax call rendering kod svakog, tima,workspacea,boarda
router.get('/sparender',function(req, res, next) {
  res.render('workspaces/index');
});

module.exports = router;
