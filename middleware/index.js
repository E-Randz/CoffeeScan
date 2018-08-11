var Coffeeshop = require("../models/coffeeshop");
var Comment    = require("../models/comment");

var middlewareObj = {

  isLoggedIn: function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
  },

  checkCoffeeshopOwnership: function(req, res, next){
  if(req.isAuthenticated()){
    Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
      if(err){
        res.redirect("back");
      } else {
        if(foundCoffeeshop.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
   res.redirect("back");
 }
}, 

checkCommentOwnership: function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        }
        
      }
    });
  } else {
   res.redirect("back");
 }
}
}

module.exports = middlewareObj;