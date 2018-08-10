var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var Schema        = mongoose.Schema;
var db            = mongoose.connection


var Coffeeshop = require("./models/coffeeshop");
var User = require("./models/user");
var Comment = require("./models/comment");

// UNCOMMENT TO SEED DATA
// var seedDB = require("./seeds")

// seedDB(); 


mongoose.connect("mongodb://localhost:27017/coffee_scan",
  {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION 
app.use(require("express-session")({
  secret: "This is the most iron clad secret...Probably",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/coffeeshops", function(req, res){
  // get all coffeeshops from database:
  console.log(req.user);
  Coffeeshop.find({}, function(err, coffeeshops){
    if(err){
      console.log(err);
    } else{
      res.render("coffeeshops/index", {coffeeshops: coffeeshops});
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
  res.render("coffeeshops/new");
});

// SHOW - MORE INFO ABOUT 1 COFFEESHOP
app.get("/coffeeshops/:id", function(req,res){
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

// ====================================================
//COMMENTS ROUTES
app.get("/coffeeshops/:id/comments/new", isLoggedIn, function(req, res){
  Coffeeshop.findById(req.params.id, function(err, foundCoffeeshop){
    if(err){
      console.log(err)
    } else {
      res.render("comments/new", {coffeeshop: foundCoffeeshop});
    }
  })
  
});

app.post("/coffeeshops/:id/comments", isLoggedIn, function(req, res){
 Coffeeshop.findById(req.params.id, function(err, coffeeshop){
  if(err){
    console.log(err)
    res.redirect("/coffeeshops");
  } else {
    Comment.create(req.body.comment, function(err, comment){
      if(err){
        console.log(err)
      } else {
        coffeeshop.comments.push(comment);
        coffeeshop.save();
        res.redirect(`/coffeeshops/${coffeeshop._id}`);
      }
    })
  }
})
});

//===================================================
// AUTH ROUTES

app.get("/register", function(req, res){
  res.render("register");
})

//  SIGN UP LOGIC
app.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");

    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/coffeeshops");
    })
  })
});
// SHOW LOGIN FORM
app.get("/login", function(req, res){
  res.render("login");
});

//LOGIN LOGIC
app.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/coffeeshops",
    failureRedirect: "/login"
  }), function(req, res){

});
// LOGOUT
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/coffeeshops");
});

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

var server = app.listen(8080, function(){
  console.log(`CoffeeScan server has started`);
});
