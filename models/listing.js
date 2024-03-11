const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
    title:{
        type: String,
    },
    description: String,
    image: {
        filename : {
            type: String,
            default: "Image"
        },
        url: {
            type: String,
            default:"https://images.unsplash.com/photo-1517480448885-d5c53555ba8c?q=80&w=1499&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v)=> v===""?"https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1349&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type: String,
            enum: ["Point"],
        },
        coordinates:{
            type: [Number],
        }
    },
    category:{
        type: String,
        enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"]
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;