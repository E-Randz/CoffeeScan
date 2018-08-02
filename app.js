var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/coffeeshops", function(req, res){
    let coffeeshops = [
            {name: "Grindsmith", image: 'https://source.unsplash.com/xLQBjknwmzU/400x300'},
            {name: "Pot Kettle Black", image: 'https://source.unsplash.com/9uxJt-LtqKU/400x300'},
            {name: "The Department of Coffee and Social Affairs", image: 'https://source.unsplash.com/k_RYBedEvDw/400x300'}
        ]
        res.render("coffeeshops", {coffeeshops: coffeeshops});
});

app.post("/coffeeshops", function(req,res){
    // get data from form and add to campground array
    res.send("you hit the post route");
    // redirect back to campgrounds page
});

var server = app.listen(8080, function(){
    console.log(`CoffeeScan server has started`);
});