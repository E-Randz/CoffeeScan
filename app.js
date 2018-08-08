var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;
var db          = mongoose.connection

var Coffeeshop = require("./models/coffeeshop");
// var User = require("./models/user");
// var Comment = require("./models/comment");
var seedDB = require("./seeds")

seedDB(); 

mongoose.connect("mongodb://localhost:27017/coffee_scan",
{useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Setup Schema

// Coffeeshop.create({
//   name: "Pot Kettle Black",
//   image: "https://source.unsplash.com/kSlL887znkE/400x300",
//   description: `Located in the beautiful Victorian era Barton Arcade,
//                 this venue not only has great coffee, but also boasts
//                 a fantastic brunch menu.`
// }, function(err, result){
//   if(err){
//     console.log(`${err} oh no!`);
//   } else{
//     console.log(`Nailed it \n ${result} was added to database`);
//   }
// });

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  // get all coffeeshops from database:
  Coffeeshop.find({}, function(err, coffeeshops){
    if(err){
      console.log(err);
    } else{
      res.render("index", {coffeeshops: coffeeshops});
    }
  });
});

app.post("/coffeeshops", function(req,res){
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

app.get("/coffeeshops/new", function(req,res){
  res.render("new");
});

// SHOW - MORE INFO ABOUT 1 COFFEESHOP
app.get("/coffeeshops/:id", function(req,res){
  // find coffeeshop with provided id
  // render show template
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    if(err){
      console.log(err);
    } else {
      res.render("show", {coffeeshop: foundCoffeeshop});
    }
  });
});

var server = app.listen(8080, function(){
  console.log(`CoffeeScan server has started`);
});
