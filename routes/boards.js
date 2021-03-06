var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');
var Workspace = require('../models/workspace');

/* GET home page. */
router.get('/', middleware.ensureAuthenticated, function(req, res, next) {
  res.render('main/layout');
  /*
  else res.render('error', {
    message: 'You do not have permission to access this page.',
    error: {
      status: '404',
      stack: 'Access denied.'
    }
  });*/ // ovo je ostalo od ranije kada je bila ruta /user/ognjen/boards, pa se proveravalo da li je username iz paramsa jednak sa ovim userom, da jedan user ne moze da ode na profil od drugog ali ovo je nepotrebno kad je samo /boards onda je ok , ovo ubaciti tamo kada se bude islo localhost/ognjen tj kada ide kod sebe na account itd... pa ce onda trebati proveravanje da ne moze jedan user da ode kod ovog. TODO ovo iskoristiti kada se budu koristile rute tipa /:username itd

});

/*router.get('/', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});*/ //ovo je takodje ostalo zbog /user/ognjen boards, ovo ubaciti kada bude tamo hteo da ide na pocetnu, pa kada ode na /user redirektuje na ovo

router.get('/getBoards', function(req, res, next) {
  Board.getAllBoards(req.user._id,res);
}); //uzima sve boardove od tog usera mozda kasnije bude trebalo

router.get('/sparender',function(req, res, next) {
  var boardsExist = false;
  var hasPinnedBoards = false;
  var pinnedBoardsArray = [];
  var i = 0;

  var workspacesArray = [];
  // nadji sve boardove od tog usera
  Board.find({userId: req.user._id}, function(err,boards) {
    if(boards[0]) { // Ako postoji makar 1 board, renderuj
      boardsExist = true;

      boards.forEach(function(board) {
      if(board.title.length > 40)
      board.title = middleware.truncateText(board.title,0,40);

      if(board.description.length > 73)
      board.description = middleware.truncateText(board.description,0,73);

      if(board.pinned) {
        if(hasPinnedBoards == false)
          hasPinnedBoards = true;
        
          pinnedBoardsArray.push(board);
      }

      // TODO odraditi renderovanje boardova po workspaceu, na papirima je neki pocetak algoritma. Uzeti neku promenljivu i samo namestiti da se dodaju celi boardovi u taj nas workspace sto pravimo.

      Workspace.find({ userId: req.user._id, boards: board._id }, function(err, workspaces) {
        
        workspaces.forEach(function(workspace) {
          console.log("Iteracija "+i);
          console.log(workspace.title + " sadrzi board: "+ board.title);
        }); 
        i++;
      });
        
    });
    // Sklanja iz glavnog boards arraya, one boardove koji su pinovani, tako da ne bi bilo duplikata na view-u
    boards = boards.filter(function(board) {
      return pinnedBoardsArray.indexOf(board) < 0;
    });

    res.render('boards/index', {
      boards: boards.reverse(),
      hasBoards: boardsExist,
      hasPinnedBoards: hasPinnedBoards,
      pinnedBoards: pinnedBoardsArray
    });
  }
  else { // U suprotnom bacaj da nema boardova
    res.render('boards/index', {
      boards: [],
      hasBoards: boardsExist,
      hasPinnedBoards: hasPinnedBoards,
      pinnedBoards: pinnedBoardsArray
    });
  }
    
  });
  
});

// ovde opet napraviti onako rutiranje, po funkcijama pogledati na githubu.

router.get('/test',function(req, res, next) { //okej ovako bi getovao Workspaceove, timove itd, znaci da mi renderuje stranicu i da uzme iz baze ove podatke
  Board.getAllBoardsAndRender(req.user._id,res,function(err,boards) {
    if (err) {
      throw err;
    }
    res.render('boards/test', {
      boards: boards
    });
    res.end();
  });

});

router.get('/test2',function(req, res, next) {
  res.render('boards/test2', {
    testUser: req.user.username,
    testNaslov: 'NASLOVVVVVVVVVVVVVVVVVV'
  });
});

/*router.get('/:username', middleware.ensureAuthenticated, function(req, res, next) {
  res.redirect('/user/'+req.user.username+'/boards');
});*/ //nepotrebno posto ide samo /boards

router.post('/addBoard', function(req, res, next) {
  var newBoard = new Board({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    boardType: req.body.type,
    description: req.body.description,
    teams: [req.body.team],//TODO ovo napraviti kada se ubace workspaceovi i timovi, samo napomena, ovde treba da ide ID od tog workspacea, sto znaci getovati id od obelezenog workspace-a i dodati ga.
    workspaces: [req.body.workspace], //ovo isto
    pinned: req.body.pinned,
    dateCreated: req.body.dateCreated,
    userId: req.user._id
    //ovde jos description, goal i kom useru pripada itd...
  });
  Board.createBoard(req.user._id,newBoard,res);
});

// Update board
router.post('/update/:id',function(req, res, next) {
  var updatedBoard = {
    title: req.body.title,
    description: req.body.description
  };
  Board.updateTitleAndDescription(req.params.id, updatedBoard, res);
});

//Pin board
router.post('/pin/:id', function(req, res, next) {
  Board.findById(req.params.id,function(err,board) {
    Board.handlePin(req.params.id,board.pinned,res);
  })
  
});

module.exports = router;
