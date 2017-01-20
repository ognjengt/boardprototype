var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');

/* GET home page. */
router.get('/:username/boards', middleware.ensureAuthenticated, function(req, res, next) {
  if (req.params.username == res.locals.user.username) {
    var boardsExist=false;
    if(req.user.boards[0])
      boardsExist = true;

      // ovde prvo getovati iz Boards modela kad se napravi , i onda samo postaviti neku promenljivu boards pre upita iz baze, u upitu baze samo kazem da je boards = boards koji su dobijeni; I onda samo kazem render boards:boards

    res.render('user/index', {
      boards: req.user.boards,
      hasBoards: boardsExist
    });
  }
  else res.render('error', {
    message: 'You do not have permission to access this page.',
    error: {
      status: '404',
      stack: 'Access denied.'
    }
  });
});

router.get('/', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});

router.get('/getBoards', function(req, res, next) {
  res.send(req.user.boards);
});

router.get('/:username', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});

router.post('/addBoard',function(req, res, next) {
  //TODO: post request da se samo ovo sto je u inputu pushuje u board array, i da se napravi novi id.
  var newBoard = {
    _id: new mongoose.Types.ObjectId,
    title: req.body.title
  };
  User.createBoard(req.user._id,newBoard,res);
});

module.exports = router;
