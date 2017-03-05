var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var middleware = require('../middleware/middleware.js');
var mongoose = require('mongoose');

var User = require('../models/user');
var Board = require('../models/board');

//TODO napraviti posebne rute, /workspaces/ajaxRender je npr ona funkcija koja renderuje ovaj workspaces index, a ruta /workspaces je rezervisana za kada se otvara u novom tabu i ona renderuje main/layout. ZNACI: samo napravi neke rute koje ce se zvati drugacije od /workspaces i /teams, npr /workspaces/ajaxRender , /teams/ajaxRender posto je nebitno kako se te rute zovu jer ih poziva routing.js, ali bitno je da /workspaces i /teams ostanu rezervisane za kada se budu otvarale u novim tabovima. Isto tako promeniti boards/index da se zove tipa boards/renderedIndex i tako i za workspaces i teams i onda samo ti renderovani sadrze delove, a ovi pravi su celi. Losa je praksa ali jbg
router.get('/ajax',function(req, res, next) {
  res.render('workspaces/index');
});

module.exports = router;
