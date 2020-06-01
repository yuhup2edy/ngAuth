const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


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

// write a custom middleware to validate the token. 

function verifyToken(req,res,next){
  
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized Request - Missing Auth Headers');
  }
  
  let token = req.headers.authorization.split(' ')[1];
  //above command extracts the authorization header, splits it by space and extracts only second index
  // remember auth is sent as 'Bearer space jwt'. Here we will pull the jwt
  if (token === null){
    res.status(401).send('Unauthorized Request - Null Auth Token received');
  }

  let payload = jwt.verify(token,'secretKey'); // remember the secretKey is hardcoded as SecretKey
  //verify returns decoded token only if valid
  if (!payload){
    res.status(401).send('Unauthorized Request - Missing payload info on token verify');
  }
  req.userId = payload.subject; // assign the subject of payload to user id of request
  next(); // we pass control to the next operation (here, it's middleware to server)
}

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
            // generate the JWT payload as an object. by default it's called subject with the _id as the value
            let payload = {subject : registeredUser._id};
            let token = jwt.sign(payload,'secretKey'); // the 2nd argument is a secret key and can be anything. we call it string (secretkey)
            //res.status(200).send(registeredUser);
            // instead of sending the registredUser json, send the generated token back to the UI as an object
            res.status(200).send({token});
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
                    let payload = {subject : matchedUser._id};
                    let token = jwt.sign(payload,'secretKey'); // the 2nd argument is a secret key and can be anything. we call it string (secretkey)
                    //res.status(200).send(matchedUser);
                    // instead of sending the matchedUser json, send the generated token back to the UI as an object
                    res.status(200).send({token});
           
                }
            }
        }

    });

});

router.get('/events',(req,res)=>{
// return hard coded array of events; 

let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
});


router.get('/special',verifyToken,(req,res)=>{
// in the special events method, call the verifyToken as the second arg. Here workflow is that the
// verifyToken is validated and then only control is passed for below statements to execute. this is 
// controlled by the next() function that we code within the verifyToken function. 

let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
});

module.exports = router;
