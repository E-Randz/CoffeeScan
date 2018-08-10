var express    = require("express");
var router     = express.Router();
var Coffeeshop = require("../models/coffeeshop");

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
router.post("/", function(req,res){
  // get data from form and add to coffeeshop array
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCoffeeshop = {name: name, image: image, description: description};
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
router.get("/new", function(req,res){
  res.render("coffeeshops/new");
});
// SHOW - MORE INFO ABOUT 1 COFFEESHOP
router.get("/:id", function(req,res){
  // find coffeeshop with provided id
  // render show template
  Coffeeshop.findById(req.params.id).populate("comments").exec(function(err, foundCoffeeshop){
    if(err){
      console.log(err);
    } else {
     res.render("coffeeshops/show", {coffeeshop: foundCoffeeshop});
   }
 });
});



module.exports = router;

