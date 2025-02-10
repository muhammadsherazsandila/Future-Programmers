const mongoose = require('mongoose');
const fs = require('fs');
const { timeStamp } = require('console');
const ownerShema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: {
        type: Buffer,
        default: () => {
            return fs.readFileSync('./public/images/profilePlaceholder.jpg')
        }
    },
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "program"
    }],
    verificationCode: String
}, { timeStamps: true })

module.exports = mongoose.model("owner", ownerShema)