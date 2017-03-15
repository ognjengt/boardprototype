module.exports.ensureAuthenticated = function(req,res,next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
}

module.exports.truncateText = function(element,startIdx,endIdx) {
  var truncated = element.substring(startIdx,endIdx);
  truncated += '...';
  return truncated;
}
