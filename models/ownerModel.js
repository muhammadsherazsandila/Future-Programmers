const mongoose = require('mongoose');
const ownerShema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profilePic : {
        type : Buffer,
    },
    programs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "program"
    }],
    verificationCode : String
})

module.exports = mongoose.model("owner" , ownerShema)