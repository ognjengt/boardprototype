var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

var WorkspaceSchema = mongoose.Schema({
  title: String,
  description: String,
  dateCreated: Date,
  boards: [{ type : mongoose.Schema.Types.ObjectId, index: true }],
  // TODO dodati timove kada se naprave, i ovde i u boards.
  // teams: [
  //   {
  //     _id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true
  //     }
  //   }
  // ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});

var Workspace = module.exports = mongoose.model('Workspace', WorkspaceSchema);

module.exports.createWorkspace = function(userId,newWorkspace,res) {
  newWorkspace.save(function(err) {
      if (err) {
        throw err;
      }
    })
    res.send(newWorkspace);
    res.end();
}

module.exports.getAllWorkspaces = function(userId,res) {
  Workspace.find({userId: userId}, function(err,workspaces) {
    if (err) {
      throw err;
    }
    res.send(workspaces);
    res.end();
  });
}

module.exports.populateWithBoard = function(boardId,workspaces,res) {
  var i = 0;
  workspaces.forEach(function(workspaceId) {
    // proveriti da se doda novi samo ukoliko on vec ne postoji u tom workspaceu

    Workspace.findById(workspaceId,function(err,ws) {
      console.log(ws.boards.indexOf(boardId));
      if(!(ws.boards.indexOf(boardId) > -1)) {
        Workspace.findByIdAndUpdate(workspaceId, {$push: {boards: new Object({_id: boardId})}},{new: true}, function(err) {
          if (err) {
            throw err;
          }
          });
      }
    });

      i++;
      if(i == workspaces.length) {
        res.send(workspaces);
        res.end();
      }
    
  });
  // Ovo isto radi ali kaze cant set headers after they are sent, sto znaci da on vrati res send odma, a ovi to i ne izvrse, tako da ovo iznad je bukvalno isto resenje sa workaroundom
  
  // Workspace.update({ _id: { $in: [workspaces] }}, { $push: {boards: new Object({_id: boardId})}}, { new: true }, function(err) {
  //     if (err) {
  //       throw err;
  //     }
  //     res.send(workspaces);
  //     res.end();
  // });
}