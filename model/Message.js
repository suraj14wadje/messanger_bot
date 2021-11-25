const mongoose = require('mongoose')


const Message = new mongoose.Schema({
    mid:{
        type:String,
        unique:true,
        required:true
    },
    text:String,
    user:{ 
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Message',Message);