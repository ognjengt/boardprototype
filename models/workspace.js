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

module.exports.addToWorkspace = function(boardId,res) {
  
}