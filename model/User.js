const mongoose = require('mongoose')


const User = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    name:String,
    birthDate:String,
    state:String
})


module.exports = mongoose.model('User',User);

