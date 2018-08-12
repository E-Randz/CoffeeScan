var express    = require("express");
var router     = express.Router();
var Coffeeshop = require("../models/coffeeshop");
var middleware = require("../middleware");

//show all coffeeshops
router.get("/", function(req, res){
  Coffeeshop.find({}, function(err, coffeeshops){
    if(err){
      console.log(err);
    } else{
      res.render("coffeeshops/index", {coffeeshops: coffeeshops});
    }
  });
});
//create - add new
router.post("/", middleware.isLoggedIn, function(req,res){
  // get data from form and add to coffeeshop array
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let speciality = req.body.speciality;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCoffeeshop = {name: name, image: image, description: description, author: author, speciality: speciality};
  // create new coffeeshop and save to database;
  Coffeeshop.create(newCoffeeshop, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      // redirect back to coffeeshops page
      res.redirect("/coffeeshops");
    }
  })
});
//new - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
  res.render("coffeeshops/new");
});
// SHOW - MORE INFO ABOUT 1 COFFEESHOP
router.get("/:id", function(req,res){
  // find coffeeshop with provided id
  // render show template
  Coffeeshop.findById(req.params.id).populate("comments").exec(function(err, foundCoffeeshop){
    if(err || !foundCoffeeshop){
      req.flash("error", "Coffeeshop not found.");
      res.redirect("back");
    } else {
     res.render("coffeeshops/show", {coffeeshop: foundCoffeeshop});
   }
 });
});

// EDIT COFFEESHOP ROUTE
router.get("/:id/edit", middleware.checkCoffeeshopOwnership, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    res.render("coffeeshops/edit", {coffeeshop: foundCoffeeshop});
  });
});

//UPDATE COFFEESHOP ROUTE
router.put("/:id", middleware.checkCoffeeshopOwnership, function(req, res){
  Coffeeshop.findByIdAndUpdate(req.params.id, req.body.coffeeshop, function(err, updatedCoffeeshop){
    if(err){
      res.redirect("/coffeeshops");
    } else {
      res.redirect("/coffeeshops/" + req.params.id);
    }
  })
});

// DELETE COFFEESHOP ROUTE
router.delete("/:id", middleware.checkCoffeeshopOwnership, function(req, res){
  Coffeeshop.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/coffeeshops");
    } else {
      res.redirect("/coffeeshops");
    }
  })
});

module.exports = router;

