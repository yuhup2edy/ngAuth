const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Response coming from the API routes file on server");
});

module.exports = router;
