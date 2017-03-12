var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

var WorkspaceSchema = mongoose.Schema({
  title: String,
  description: String,
  dateCreated: Date,//TODO dodati workspaces i teams
  boards: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});

var Workspace = module.exports = mongoose.model('Workspace', WorkspaceSchema);
