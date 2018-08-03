var express     = require("express");
app         = express();
bodyParser  = require("body-parser");
mongoose    = require("mongoose");
Schema      = mongoose.Schema;
db          = mongoose.connection

mongoose.connect("mongodb://localhost:27017/coffee_scan",
{useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Setup Schema
var coffeeshopSchema = Schema({
  name: String,
  image: String
});

var Coffeeshop = mongoose.model("Coffeeshop", coffeeshopSchema);

// Coffeeshop.create({
//   name: "Pot Kettle Black",
//   image: 'https://source.unsplash.com/kSlL887znkE/400x300'
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
      res.render("coffeeshops", {coffeeshops: coffeeshops});
    }
  });
});

app.post("/coffeeshops", function(req,res){
  // get data from form and add to coffeeshop array
  let name = req.body.name;
  let image = req.body.image;
  let newCoffeeshop = {name: name, image: image};
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

var server = app.listen(8080, function(){
  console.log(`CoffeeScan server has started`);
});
