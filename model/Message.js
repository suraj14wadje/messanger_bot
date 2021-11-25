const mongoose = require('mongoose')


const Message = new mongoose.Schema({
    mId:String,
    text:String,
    user:{ 
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Message',Message);