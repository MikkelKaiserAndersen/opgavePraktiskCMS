var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
        {
        name: "Clouds rest",
        image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, ei vis possit tritani rationibus, mel ei suscipit accusata. Has ut luptatum perfecto, ex vis adhuc voluptatum. Sit no modo impedit, molestie corrumpit instructior mel at. Et qui illud mollis erroribus. Vel solum dolore ei. Mea eu veri nonumes."
        },
         {
        name: "Desert Mesa",
        image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, ei vis possit tritani rationibus, mel ei suscipit accusata. Has ut luptatum perfecto, ex vis adhuc voluptatum. Sit no modo impedit, molestie corrumpit instructior mel at. Et qui illud mollis erroribus. Vel solum dolore ei. Mea eu veri nonumes."
        },
         {
        name: "Rocky Mountains",
        image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, ei vis possit tritani rationibus, mel ei suscipit accusata. Has ut luptatum perfecto, ex vis adhuc voluptatum. Sit no modo impedit, molestie corrumpit instructior mel at. Et qui illud mollis erroribus. Vel solum dolore ei. Mea eu veri nonumes."
        },
        
    ];
function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err){
            console.log(err);
        }
    console.log("removed campgrounds");
    // Add few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    // Create a comment
                    Comment.create(
                        {
                            text:"This place is great, but i wish there was internet",
                            author:"Homer" 
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Comment has been created");
                            }
                            
                        });
                }
            });
        });
    });
    
    // Add few comments
}

module.exports = seedDB;
