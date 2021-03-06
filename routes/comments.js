var express    = require("express");
var router     = express.Router({mergeParams:true});
var Coffeeshop = require("../models/coffeeshop");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    if(err){
      req.flash("error", "Campground not found");
      res.redirect("back");
    } else {
      res.render("comments/new", {coffeeshop: foundCoffeeshop});
    }
  })
  
});
//comments create 
router.post("/", middleware.isLoggedIn, function(req, res){
 Coffeeshop.findById(req.params.id, function(err, coffeeshop){
  if(err || coffeeshop){
    req.flash("error", "Campground not found");
    res.redirect("back");
  } else {
    Comment.create(req.body.comment, function(err, comment){
      if(err){
        req.flash("error", "Something went wrong.");
      } else {
        // add username and id to comment
        comment.author.id = req.user._id;
        comment.author.username = req.user.username
        //save comment
        comment.save();
        coffeeshop.comments.push(comment);
        coffeeshop.save();
        req.flash("sucess", "Successfully added comment.");
        res.redirect(`/coffeeshops/${coffeeshop._id}`);
      }
    })
  }
})
});
// comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {coffeeshop_id: req.params.id, comment: foundComment});
    }
  });
});
// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    if(err || !foundCoffeeshop){
      req.flash("error", "No coffeeshop found.");
      return res.redirect("back");
    }
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
      if(err){
        res.redirect("back");
      } else {
        res.redirect("/coffeeshops/" + req.params.id);
      }
    });
  });
});
// comment delete
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted.");
      res.redirect("/coffeeshops/" + req.params.id);
    }
  })
});

module.exports = router;
