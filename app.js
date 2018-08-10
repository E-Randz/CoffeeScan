var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
var passport      = require("passport");
var LocalStrategy = require("passport-local");
var Schema        = mongoose.Schema;
var db            = mongoose.connection
//requiring routes
var commentRoutes    = require("./routes/comments");
var coffeeshopRoutes = require("./routes/coffeeshops");
var authRoutes       = require("./routes/index");


var Coffeeshop = require("./models/coffeeshop");
var User       = require("./models/user");
var Comment    = require("./models/comment");

// UNCOMMENT TO SEED DATA
// var seedDB = require("./seeds")

// seedDB(); 

mongoose.connect("mongodb://localhost:27017/coffee_scan",
  {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

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
//express router
app.use(authRoutes)
app.use("/coffeeshops/:id/comments", commentRoutes)
app.use("/coffeeshops", coffeeshopRoutes);



var server = app.listen(8080, function(){
  console.log(`CoffeeScan server has started`);
});
