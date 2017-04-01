var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');
var Workspace = require('../models/workspace');

//Spa render, renderuje samo content unutar workspaceova, dok /workspaces getuje ceo layout koji pomocu rutiranja poziva /sparender

router.get('/',middleware.ensureAuthenticated,function(req, res, next) {
  res.render('main/layout');
});
// ruta /sparender je za single page ajax call rendering kod svakog, tima,workspacea,boarda
router.get('/sparender',function(req, res, next) {
  res.render('workspaces/index');
});

router.post('/addWorkspace',function(req, res, next) {
  var newWorkspace = new Workspace({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    teams: [req.body.team],//TODO ovo napraviti kada se ubace workspaceovi i timovi, samo napomena, ovde treba da ide ID od tog workspacea, sto znaci getovati id od obelezenog workspace-a i dodati ga.,
    dateCreated: req.body.dateCreated,
    userId: req.user._id
    //ovde jos description, goal i kom useru pripada itd...
  });
  Workspace.createWorkspace(req.user._id,newWorkspace,res);
});

module.exports = router;
