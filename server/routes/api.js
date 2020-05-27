const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const db = "mongodb+srv://sriram:pwsriram@cluster0-ver7x.mongodb.net/eventsdb?retryWrites=true&w=majority";

mongoose.connect(db,err=>{
    //mongoose.connect(db,(err)=>{ 
    if(err)
    {
        console.log("Mongo DB Connect Error "+ err);
    }
    else
    {
        console.log("Successfully connected to DB");
    }
})

router.get('/',(req,res)=>{
    res.send("Response coming from the API routes file on server");
});

module.exports = router;
