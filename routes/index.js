var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user")


//root route
router.get("/", function(req, res){
  res.render("landing");
});
//show register form
router.get("/register", function(req, res){
  res.render("register");
})
//handle sign up logic
router.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.redirect("/register");

    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to CoffeeScan, " + user.username + "!");
      res.redirect("/coffeeshops");
    })
  })
});
//show login form
router.get("/login", function(req, res){
  res.render("login");
});
//handle login logic
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/coffeeshops",
    failureRedirect: "/login",
    failureFlash: true
  }), function(req, res){

});
// handle logout logic
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/coffeeshops");
});

module.exports = router;
