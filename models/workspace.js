var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

var WorkspaceSchema = mongoose.Schema({
  title: String,
  description: String,
  dateCreated: Date,
  boards: { //ovo namestiti kako valja
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
