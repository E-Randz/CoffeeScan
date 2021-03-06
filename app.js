var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var methodOverride = require("method-override");
var flash          = require("connect-flash");
var Schema         = mongoose.Schema;
var db             = mongoose.connection
var seedDB         = require("./seeds")
//requiring routes
var commentRoutes    = require("./routes/comments");
var coffeeshopRoutes = require("./routes/coffeeshops");
var authRoutes       = require("./routes/index");


var Coffeeshop = require("./models/coffeeshop");
var User       = require("./models/user");
var Comment    = require("./models/comment");
// seed the database
// seedDB(); 

mongoose.connect(process.env.DATABASEURL,
  {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})
//express router
app.use(authRoutes)
app.use("/coffeeshops/:id/comments", commentRoutes)
app.use("/coffeeshops", coffeeshopRoutes);



var server = app.listen(process.env.PORT || 8080, function(){
  console.log(`CoffeeScan server has started`);
});
