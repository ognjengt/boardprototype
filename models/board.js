var mongoose = require('mongoose');

var User = require('../models/user');

var BoardSchema = mongoose.Schema({
  title: String,
  description: String,
  boardType: String,//type je kljucna rec
  pinned: Boolean,
  dateCreated: Date,//TODO dodati workspaces i teams
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});

var Board = module.exports = mongoose.model('Board', BoardSchema);

module.exports.createBoard = function(userId,newBoard,res) {

  User.findByIdAndUpdate(userId, {$push: {boards: new Object({_id: newBoard._id})}},{new: true}, function(err, user) {
    if (err) {
      throw err;
    }
    newBoard.save(function(err) {
      if (err) {
        throw err;
      }
    })
    res.send(newBoard);
    res.end();
  });
}

module.exports.getAllBoards = function(userId,res) { //ovo je cist api, samo da mi posalje nazad sve boardove u jsonu
  Board.find({userId: userId}, function(err,boards) {
    if (err) {
      throw err;
    }
    res.send(boards);
    res.end();
  })
}

module.exports.getAllBoardsAndRender = function(userId,res,callback) { // ovo je getAllBoards sa callback funkcijom koju cu proslediti
  Board.find({userId: userId}, callback);
}
