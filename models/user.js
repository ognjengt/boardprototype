var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/stormboard');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  email: String,
  fullName: String,
  password: String,
  boards: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      title: String,
      description: String,
      goal: String,
      pinned: Boolean,
      dateCreated: Date,
      //ovde workspaceovi
    }
  ],
  //ovde workspaceovi
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserByEmail = function(email,callback) {
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) {
      throw err;
    }
    callback(null, isMatch);
  })
}

module.exports.createBoard = function(id,board,res) {
  User.findByIdAndUpdate(id, {$push: {boards: board}},{new: true}, function(err, board) {
    if (err) {
      throw err;
    }
    //res.send(board); ovde ili smisli kako da vratis to pa da ti se populatuje u realtimeu, ili jednostavno nemoj dirati nista, i samo nekako iz ajax calla rucno napravi novi div, na success funkciju
  });
}
