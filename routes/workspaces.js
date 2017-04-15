var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');
var Workspace = require('../models/workspace');

var projectBoardCounter = 0;

//Spa render, renderuje samo content unutar workspaceova, dok /workspaces getuje ceo layout koji pomocu rutiranja poziva /sparender

router.get('/',middleware.ensureAuthenticated,function(req, res, next) {
  res.render('main/layout');
});

router.get('/getWorkspaces', function(req, res, next) {
  Workspace.getAllWorkspaces(req.user._id,res);
}); //uzima sve boardove od tog usera mozda kasnije bude trebalo
// ruta /sparender je za single page ajax call rendering kod svakog, tima,workspacea,boarda
router.get('/sparender',function(req, res, next) {
  var workspacesExist = false;

    Workspace.find({userId: req.user._id}, function(err,workspaces) {
    if(workspaces[0]) { // Ako postoji makar 1 workspace, renderuj
      workspacesExist = true;

      workspaces.forEach(function(workspace) {
      if(workspace.title.length > 40)
      workspace.title = middleware.truncateText(workspace.title,0,40);

      if(workspace.description.length > 130)
      workspace.description = middleware.truncateText(workspace.description,0,130);

      // TODO Ovde logika za racunanje koliko ima boardova kog tipa ako se bude ubacivalo
      // Ovo ovako ne moze zato sto je asinhron request, najbolje bi bilo cuvati ceo Board u workspaceu pa onda njemu pristupiti
      // workspace.boards.forEach(function(boardId) {
      //   Board.findById(boardId,function(err,board) {
      //     if(board.boardType == "Project") projectBoardCounter++;
      //     //console.log(projectBoardCounter);
      //   })
      // })

    });

    res.render('workspaces/index', {
      workspaces: workspaces.reverse(),
      hasWorkspaces: workspacesExist
    });

  }
  else { // U suprotnom bacaj da nema workspaceova
    res.render('workspaces/index', {
      workspaces: [],
      hasWorkspaces: workspacesExist
    });
  }
    
  });

});

router.post('/addWorkspace',function(req, res, next) {
  var newWorkspace = new Workspace({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    teams: [req.body.team],//TODO ovo napraviti kada se ubace workspaceovi i timovi, samo napomena, ovde treba da ide ID od tog workspacea, sto znaci getovati id od obelezenog workspace-a i dodati ga.,
    dateCreated: req.body.dateCreated,
    userId: req.user._id,
    boards: req.body.boards
    //ovde jos description, goal i kom useru pripada itd...
  });
  Workspace.createWorkspace(req.user._id,newWorkspace,res);
});

module.exports = router;
