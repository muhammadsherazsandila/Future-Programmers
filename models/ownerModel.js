const mongoose = require('mongoose');
const fs = require('fs');
const ownerShema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profilePic : {
        type : Buffer,
        default : ()=>{
            return fs.readFileSync('./public/images/profilePlaceholder.jpg')
        }
    },
    programs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "program"
    }],
    verificationCode : String
})

module.exports = mongoose.model("owner" , ownerShema)