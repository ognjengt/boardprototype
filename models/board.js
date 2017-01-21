var mongoose = require('mongoose');

var User = require('../models/user');

var BoardSchema = mongoose.Schema({
  title: String,
  description: String,
  goal: String,
  boardType: String,//type je kljucna rec
  pinned: Boolean,
  dateCreated: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
});

var Board = module.exports = mongoose.model('Board', BoardSchema);

module.exports.createBoard = function(userId,newBoard,res) {
// u userov board array dodati newBoard._id
// u boardovima uraditi samo .save
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
