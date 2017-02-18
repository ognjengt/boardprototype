var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.redirect('/boards');
  }
  res.render('index');
});

router.get('/register', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/boards');
  }
  else res.render('register');
});

router.post('/register', function(req, res, next) {

  User.findOne({username: req.body.username},function(err,user) {
    if (err) {
      throw err;
    }
    if (user) {
      req.flash('error_msg', 'User with that username already exists');
      res.redirect('/register');
    }
    else {
      User.findOne({email: req.body.email}, function(err,user) {
        if (err) {
          throw err;
        }
        if(user) {
          req.flash('error_msg', 'User with that email already exists');
          res.redirect('/register');
        }
        else {
          var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            fullName: req.body.fullName,
            picture: 'no-avatar.png',
            password: req.body.password
          })

          User.createUser(newUser, function(err,user) {
            if(err) throw err;
            req.flash('success_msg', 'Succesfully registered! You can now Sign in.');
            res.redirect('/login');
          });
        }
      })

    }
  })
});

router.get('/login', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/boards');
  }
  else res.render('login');

});

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username.includes('@')) {
      User.getUserByEmail(username, function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          return done(null,false, {message: 'Sorry, that user does not exist'});
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null,user);
          }
          else {
            return done(null,false,{message: 'Invalid password'});
          }
        })
      });
    }
    else {
      User.getUserByUsername(username, function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          return done(null,false, {message: 'Sorry, that user does not exist'});
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null,user);
          }
          else {
            return done(null,false,{message: 'Invalid password'});
          }
        })
      });
    }

}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),//failureFlash promeniti kada ubacis flash messages
  function(req, res) {
    res.redirect('/boards');
});

// Nece trebati na indexu posto ce se prikazivati samo landing page
router.get('/logout', function(req,res) {
  req.logout();

  res.redirect('/login');
});
module.exports = router;
