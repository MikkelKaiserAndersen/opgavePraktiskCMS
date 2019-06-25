var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");




// Root route
router.get("/", function(req, res){
   res.render("landing"); 
});
// Register form route
router.get("/register", function(req, res) {
    res.render("register");
});

// Håndter signup logik
router.post("/register", function(req, res) {
   var newUser = new User({username:req.body.username});
   User.register(newUser, req.body.password, function (err,user){
      if(err){
    console.log(err);
    return res.render("register", {error: err.message});
        }
       passport.authenticate("local")(req,res, function(){
           req.flash('success', 'Welcome to YelpCamp ' + user.username);
           res.redirect("/campgrounds");
       });
   });
});

// Show login form

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

// Handeling login logic
router.post('/login', passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), function(req, res) {
});

// Logout route
router.get('/logout', function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect('/campgrounds');
});

// Middlware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect("/login");
};

module.exports = router;