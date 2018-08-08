var Coffeeshop = require("./models/coffeeshop");
var Comment   = require("./models/comment");

var data = [
{
    name: "Ground Up Coffee", 
    image: "https://source.unsplash.com/-2etgsqvy68/600x400",
    description: "Wings arabica, cinnamon cappuccino filter, bar, flavour mug, to go, est, flavour, extraction carajillo cappuccino, spoon dripper aged siphon turkish. Brewed a black, medium sugar mocha, trifecta bar, acerbic, pumpkin spice and body wings turkish pumpkin spice. Fair trade dripper saucer so siphon, redeye roast cup, turkish frappuccino est redeye, doppio barista, at percolator viennese grinder chicory, cream dripper aromatic medium rich. Carajillo, whipped percolator carajillo foam grounds, mazagran pumpkin spice body, breve single origin crema mocha con panna."
},
{
    name: "Otter & Spoon", 
    image: "https://source.unsplash.com/xLQBjknwmzU/600x400",
    description: "Eu, saucer con panna cultivar saucer that, organic, espresso et, arabica that single origin macchiato beans. Macchiato, crema froth dripper, instant cup black ristretto sit galão shop, that skinny mazagran bar single origin café au lait. Saucer, extra id aroma pumpkin spice to go cultivar barista viennese cup viennese macchiato carajillo siphon sit white. Fair trade breve aftertaste et, siphon medium percolator doppio espresso iced qui grounds robust grounds caffeine, qui pumpkin spice aromatic froth coffee."
},
{
    name: "Sawdust & Pens", 
    image: "https://source.unsplash.com/unEI4g0oOYc/600x400",
    description: "Robusta saucer, variety, mocha breve trifecta blue mountain, carajillo, plunger pot, medium in mug, con panna a saucer trifecta java. Brewed java wings instant siphon, aftertaste, ristretto in americano kopi-luwak percolator chicory crema. Instant sit viennese, mocha, breve, white breve, spoon whipped doppio at, fair trade dripper chicory, ut chicory rich galão, latte dark percolator java half and half. Redeye ut variety in lungo steamed, seasonal, black con panna roast, a, froth dripper, decaffeinated, as spoon, white acerbic mug ristretto irish half and half cortado."
}
]

function seedDB(){
    //REMOVE COFFEESHOPS
    Coffeeshop.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed coffeeshops");

            Comment.remove({}, function(err) {
                if(err){
                    console.log(err);
                }
                console.log("removed comments!");
             //add a few campgrounds

             data.forEach(function(seed){
                Coffeeshop.create(seed, function(err, coffeeshop){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("coffeeshop added!");
                        Comment.create(
                        {
                            text: "This is the bee's knees",
                            author: "Jenny"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                coffeeshop.comments.push(comment);
                                coffeeshop.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                }); 
            });
         });
        }
    });
};
                            






module.exports = seedDB;
// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }

// module.exports = seedDB;