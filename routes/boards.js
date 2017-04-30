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

// router.get('/sparender',function(req, res, next) {
//   var boardsExist = false;
//   var hasPinnedBoards = false;
//   var pinnedBoardsArray = [];
//   var i = 0;

//   var retWorkspacesArray = [];
//   // nadji sve boardove od tog usera
//   Board.find({userId: req.user._id}, function(err,boards) {
//     if(boards[0]) { // Ako postoji makar 1 board, renderuj
//       boardsExist = true;

//       boards.forEach(function(board) {
//       if(board.title.length > 40)
//       board.title = middleware.truncateText(board.title,0,40);

//       if(board.description.length > 73)
//       board.description = middleware.truncateText(board.description,0,73);

//       if(board.pinned) {
//         if(hasPinnedBoards == false)
//           hasPinnedBoards = true;
        
//           pinnedBoardsArray.push(board);
//       }

//       // TODO odraditi renderovanje boardova po workspaceu, na papirima je neki pocetak algoritma. Uzeti neku promenljivu i samo namestiti da se dodaju celi boardovi u taj nas workspace sto pravimo.
        
//     });
//     // Sklanja iz glavnog boards arraya, one boardove koji su pinovani, tako da ne bi bilo duplikata na view-u
//     boards = boards.filter(function(board) {
//       return pinnedBoardsArray.indexOf(board) < 0;
//     });

//     Workspace.find({ userId: req.user._id },function(err,workspaces) {
//       if(err) throw err;

//       // Prodji kroz sve workspaceove od tog usera i svaki board nadji i dodaj ga u objekat

//       workspaces.forEach(function(workspace) {
//         var newWorkspace = {
//           _id: workspace._id,
//           title: workspace.title,
//           dateCreated: workspace.dateCreated,
//           userId: workspace.userId,
//           boards: []
//         }

//         workspace.boards.forEach(function(boardId) {
//           Board.findById(boardId, function(err,board) {
//             if(err) throw err;

//             newWorkspace.boards.push(board);
//             console.log(newWorkspace);
//           });

//         });
//         retWorkspacesArray.push(newWorkspace);
//       });
      

//       res.render('boards/index', {
//         boards: boards.reverse(),
//         hasBoards: boardsExist,
//         hasPinnedBoards: hasPinnedBoards,
//         pinnedBoards: pinnedBoardsArray
//       });

//     }); //ovde
//   }
//   else { // U suprotnom bacaj da nema boardova
//     res.render('boards/index', {
//       boards: [],
//       hasBoards: boardsExist,
//       hasPinnedBoards: hasPinnedBoards,
//       pinnedBoards: pinnedBoardsArray
//     });
//   }
    
//   });
  
// });

function getBoardsAsync(req,res,next) {
   req.boardsExist = false;
   req.hasPinnedBoards = false;
   req.pinnedBoardsArray = [];
  // nadji sve boardove od tog usera
  Board.find({userId: req.user._id}, function(err,boards) {
    if(boards[0]) { // Ako postoji makar 1 board, renderuj
      req.boardsExist = true;

      boards.forEach(function(board) {
      if(board.title.length > 40)
      board.title = middleware.truncateText(board.title,0,40);

      if(board.description.length > 73)
      board.description = middleware.truncateText(board.description,0,73);

      if(board.pinned) {
        if(req.hasPinnedBoards == false)
          req.hasPinnedBoards = true;
        
          req.pinnedBoardsArray.push(board);
      }
        
    });
    // Sklanja iz glavnog boards arraya, one boardove koji su pinovani, tako da ne bi bilo duplikata na view-u
    boards = boards.filter(function(board) {
      return req.pinnedBoardsArray.indexOf(board) < 0;
    });

    req.allBoards = boards;
    return next();
  }
  else { // U suprotnom bacaj da nema boardova
    res.render('boards/index', {
      boards: [],
      hasBoards: req.boardsExist,
      hasPinnedBoards: req.hasPinnedBoards,
      pinnedBoards: req.pinnedBoardsArray
    });
  }
    
  });
}

function getWorkspacesAsync(req,res,next) {
  req.retWorkspacesArray = [];
  Workspace.find({ userId: req.user._id },function(err,workspaces) {
      if(err) throw err;


      workspaces.forEach(function(workspace) {
         req.newWorkspace = {
          _id: workspace._id,
          title: workspace.title,
          dateCreated: workspace.dateCreated,
          userId: workspace.userId,
          boards: []
        }
        req.currentWorkspace = workspace;
        
        // kazem da mi prodje kroz sve boardove od req.CurrentWorkspace workspacea, kada zavrsi ispise array workspaceova koji je vracen, tj onaj koji ce biti renderovan
        goThroughBoards(req,res,next,function(wsArray) {
          console.log('Vracen retWorkspacesArray ');
          console.log(wsArray);
        });
      });
  });
}
 
 //prolazi kroz sve boardove od zadatog workspacea i dodaje ih u newWorkspace
function goThroughBoards(req,res,next,callback) {
  var counter = 0;
  req.currentWorkspace.boards.forEach(function(boardId) {
    req.currentBoardId = boardId;
    getThatBoard(req,res,next,function(board) {
      req.newWorkspace.boards.push(board);
      counter++;
      console.log('Vracen board od getThatBoard i upisan u workspace: ');
      console.log(req.newWorkspace);
      if(counter == req.currentWorkspace.boards.length) {
        req.retWorkspacesArray.push(req.newWorkspace);
        console.log('Counter je '+counter+' i ispisujem retWsArray');
        console.log(req.retWorkspacesArray);
        return next();
      }
    });
  });
  callback(req.retWorkspacesArray);
}

// vraca board koji je zatrazen
function getThatBoard(req,res,next,callback) {
  Board.findById(req.currentBoardId,function(err,board) {
    callback(board);
  })
}

function renderBoards(req,res,next) {
  console.log(req.retWorkspacesArray);
  var workspacesExist = false;
  if(req.retWorkspacesArray[0]) {
    workspacesExist = true;
  }
  if(req.retWorkspacesArray[0])
  res.render('boards/index', {
    boards: req.allBoards.reverse(),
    hasBoards: req.boardsExist,
    hasPinnedBoards: req.hasPinnedBoards,
    pinnedBoards: req.pinnedBoardsArray,
    hasWorkspaces: workspacesExist,
    workspacesToRender: req.retWorkspacesArray
  });
}

router.get('/sparender', getBoardsAsync, getWorkspacesAsync, renderBoards);

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
