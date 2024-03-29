var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


// Index route
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

// Create add new campground
router.post("/", middleware.isLoggedIn ,function(req, res){
   // Data fra form og put det ind i campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
     id: req.user._id,
     username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};
//   Create new campground and save to db
Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
           res.redirect("/campgrounds"); 
        }
    });
});
// New form to create a new campground
router.get("/new",middleware.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
});

// Show specific campground
router.get("/:id", function(req, res) {
    // Find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
        // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit Campground Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
          Campground.findById(req.params.id, function(err, foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
    });
});


// Update campground route
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    // Find og opdater det rigtige campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // Redirect et sted hen
});
// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// Middlware





module.exports = router;