//jshint esversion:6

module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error_msg", "Prašome prisijungti");
    res.redirect("/users/login");
  }
};
