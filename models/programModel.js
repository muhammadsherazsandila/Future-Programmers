const mongoose = require('mongoose');
let programShema = mongoose.Schema({
    title : String,
    code : String,
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        reg : 'owner'
    }
})
module.exports = mongoose.model("program" , programShema)