var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

/* GET home page. */
router.get('/', middleware.ensureAuthenticated, function(req, res, next) {
    var boardsExist=false;
    if(req.user.boards[0]) {
      boardsExist = true;
      // nadji sve boardove od tog usera
      Board.find({userId: req.user._id}, function(err,boards) {
        res.render('boards/index', {
          boards: boards,
          hasBoards: boardsExist,
          boardCount: req.user.boards.length
        });
      })
    }
    else {
      //da ne bi dzabe pozivao upit iz db-a nego samo baci da nema
      res.render('boards/index', {
        boards: [],
        hasBoards: boardsExist,
        boardCount: 0
      });
    }
  /*
  else res.render('error', {
    message: 'You do not have permission to access this page.',
    error: {
      status: '404',
      stack: 'Access denied.'
    }
  });*/ // ovo je ostalo od ranije kada je bila ruta /user/ognjen/boards, pa se proveravalo da li je username iz paramsa jednak sa ovim userom, da jedan user ne moze da ode na profil od drugog ali ovo je nepotrebno kad je samo /boards onda je ok , ovo ubaciti tamo kada se bude islo localhost/ognjen itd... pa ce onda trebati proveravanje da ne moze jedan user da ode kod ovog.

});

/*router.get('/', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});*/ //ovo je takodje ostalo zbog /user/ognjen boards, ovo ubaciti kada bude tamo hteo da ide na pocetnu, pa kada ode na /user redirektuje na ovo

router.get('/getBoards', function(req, res, next) {
  res.send(req.user.boards);
}); //ovo proveri, da ovo je test samo...

/*router.get('/:username', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});*/ //nepotrebno posto ide samo /boards

router.post('/addBoard',function(req, res, next) {
  var newBoard = new Board({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    boardType: req.body.type,
    description: req.body.description,
    goal: req.body.goal,
    team: req.body.team,
    workspace: req.body.workspace,
    pinned: req.body.pinned,
    dateCreated: req.body.dateCreated,
    userId: req.user._id
    //ovde jos description, goal i kom useru pripada itd...
  });
  Board.createBoard(req.user._id,newBoard,res);
});

module.exports = router;
