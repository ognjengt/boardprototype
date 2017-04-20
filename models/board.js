var mongoose = require('mongoose');

var User = require('../models/user');

var BoardSchema = mongoose.Schema({
  title: String,
  description: String,
  boardType: String,//type je kljucna rec
  pinned: Boolean,
  dateCreated: Date,//TODO odkomentarisati kada se naprave workspaceovi i timovi
  // workspaces: [
  //   {
  //     _id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true
  //     }
  //   }
  // ],
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

var Board = module.exports = mongoose.model('Board', BoardSchema);

module.exports.createBoard = function(userId,newBoard,res) {
  // Ovo cisto cuvam posto ce mi trebati kako se ubacuje u array novi object sad za workspaceove, ali necu vise da user ima boardove u svom arrayu, sve je raspodeljeno
  // User.findByIdAndUpdate(userId, {$push: {boards: new Object({_id: newBoard._id})}},{new: true}, function(err, user) {
  //   if (err) {
  //     throw err;
  //   }
  // });

  newBoard.save(function(err) {
    if (err) {
      throw err;
    }
  })
  res.send(newBoard);
  res.end();
}

module.exports.getAllBoards = function(userId,res) { //ovo je cist api, samo da mi posalje nazad sve boardove od tog usera u jsonu
  Board.find({userId: userId}, function(err,boards) {
    if (err) {
      throw err;
    }
    res.send(boards);
    res.end();
  });
}

module.exports.getAllBoardsAndRender = function(userId,res,callback) { // ovo je getAllBoards sa callback funkcijom koju cu proslediti
  Board.find({userId: userId}, callback);
}

module.exports.updateTitleAndDescription = function(boardId, updatedBoard, res) {
  Board.findByIdAndUpdate(boardId, { $set: {title: updatedBoard.title, description: updatedBoard.description} },{ new: false }, function(err, board) {
    if (err) {
      throw err;
    }
    res.send(updatedBoard);
    res.end();
  })
}

module.exports.handlePin = function(boardId,pinned,res) {
  Board.findByIdAndUpdate(boardId, { $set: { pinned: !pinned } }, { new: false },function(err,board) {
    if(err) throw err;

    res.send(board);
    res.end();
  })
}
