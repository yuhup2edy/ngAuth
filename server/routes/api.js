const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/user');

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

router.post('/register',(req,res) =>{
    console.log("Received request to post data");
    let userData = req.body;    // get the input from the request 
    let user = new User(userData); // cast it to the model (includes the schema)

    user.save((error,registeredUser) => {
        if (error)
        {
            console.log("Error Received on registering new user" + error );
        }
        else
        {
            res.status(200).send(registeredUser);
        }

    });

});

router.post('/login',(req,res)=>{

    let userData = req.body;

    // use findOne method to identify if the id (email) exists in the DB. Do not proceed otherwise

    User.findOne({email : userData.email},(error,matchedUser) =>{

        if(error)
        {
            console.log("Error received while matching email id to user on login "+ error);
        }
        else
        {
            if (!matchedUser)
            {
                res.status(401).send("Invalid user Id");
            }
            else
            {
                if (matchedUser.password !== userData.password)
                {
                    res.status(401).send("Invalid Password");
                }
                else
                {
                    res.status(200).send(matchedUser);
                }
            }
        }

    });

});

router.get('/events',(req,res)=>{
// return hard coded array of events; 

    let events =[
        {
            "_id"           : "1",
            "name"          : "Auto Expo",
            "description"   : 'lorem ipsum',
            "date"          : "2012-01-12T18:25:21:511Z"    
        },
        {
            "_id"           : "2",
            "name"          : "Taxi Expo",
            "description"   : 'loreta ipsumae',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "3",
            "name"          : "Bus Expo",
            "description"   : 'Mama Biscoth',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "4",
            "name"          : "Lorry Expo",
            "description"   : 'Gentleman Vadivalue',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "5",
            "name"          : "Aeroplane Expo",
            "description"   : 'Super Mumbo Jumbo',
            "date"          : "2014-05-19T18:25:21:511Z"    
        }
    ];
    res.json(events); // return this array back to the request
});
router.get('/special',(req,res)=>{
// return hard coded array of events; 

    let events =[
        {
            "_id"           : "1",
            "name"          : "Auto Expo",
            "description"   : 'lorem ipsum',
            "date"          : "2012-01-12T18:25:21:511Z"    
        },
        {
            "_id"           : "2",
            "name"          : "Taxi Expo",
            "description"   : 'loreta ipsumae',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "3",
            "name"          : "Bus Expo",
            "description"   : 'Mama Biscoth',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "4",
            "name"          : "Lorry Expo",
            "description"   : 'Gentleman Vadivalue',
            "date"          : "2014-05-19T18:25:21:511Z"    
        },
        {
            "_id"           : "5",
            "name"          : "Aeroplane Expo",
            "description"   : 'Super Mumbo Jumbo',
            "date"          : "2014-05-19T18:25:21:511Z"    
        }
    ];
    res.json(events); // return this array back to the request
});

module.exports = router;
