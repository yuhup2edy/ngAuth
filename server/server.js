const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api');

const PORT = 3000;
const app = express();
app.use(cors());                // this will eliminate the UI error where angular & express run on different ports. CORS is middleware

app.use(bodyParser.json());
app.use('/api',api);

app.get('/',function(req,res){
    res.send("Hello From Express Server");

});

app.listen(PORT,function(){
    console.log("Server successfully running on port "+ PORT);
});

