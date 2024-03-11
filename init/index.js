const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = "pk.eyJ1IjoiZGVsdGEtc3R1ZHVlbnQiLCJhIjoiY2xvMDk0MTVhMTJ3ZDJrcGR5ZDFkaHl4ciJ9.Gj2VU1wvxc7rFVt5E4KLOQ";
const geocodingClient = mbxGeocoding({accessToken:mapToken});

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connection successful");
    })
    .then(()=>{
        Listing.deleteMany({});
        console.log("deleting");
    })
    .then(()=>{
        console.log("deleted");
        initData.data = initData.data.map((obj)=>({
            ...obj,
            owner: "65e62582d6a23ac871ade701",
        }));
    }).
    then(async ()=>{
        for(obj of initData.data){
            const resp = await geocodingClient
                .forwardGeocode({
                    query: obj.location,
                    limit: 1
                })
                .send();
            obj.geometry=resp.body.features[0].geometry;
        }
        console.log("Done adding coordinates");
    })
    .then(()=>{
        Listing.insertMany(initData.data);
    })
    .then(()=>console.log("Database initialized"))
    .catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}