const jwt = require('jsonwebtoken');
const ownerModel = require('../models/ownerModel');
require('dotenv').config();
const ownerAuthenticator = async (req , res , next)=>{
    let token = req.cookies.token;
    if(token){
        let data = jwt.verify(token , process.env.JWT_KEY)
        let owner = await ownerModel.findOne({email : data.email})
        if(owner){
            req.owner = owner._id
            next();
        }else{
            // flash message......
            res.redirect("/login")
        }
    }else{
        // flash message......
        res.redirect("/login")
    }
}

module.exports = ownerAuthenticator