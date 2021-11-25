const mongoose = require('mongoose')


const User = new mongoose.Schema({
    id:String,
    name:String,
    birthDate:String,
    state:String
})


module.exports = mongoose.model('User',User);

